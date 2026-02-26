<!-- src/routes/auth/verify-email/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onDestroy } from "svelte";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Get params from URL
    let role = "buyer";
    let token = "";
    let verified = false;
    let loading = false;
    let error = "";
    let countdown = 5;

    $: if ($page.url.searchParams.has("token")) {
        token = $page.url.searchParams.get("token") || "";
        role = $page.url.searchParams.get("role") || "buyer";
    }

    // Auto-verify if token present
    $: if (token && !verified && !loading) {
        handleVerify();
    }

    // Countdown redirect; manage timer manually rather than returning from reactive
    let timer: ReturnType<typeof setTimeout>;
    $: if (verified && countdown > 0) {
        clearTimeout(timer);
        timer = setTimeout(() => countdown--, 1000);
    }

    onDestroy(() => clearTimeout(timer));

    $: if (verified && countdown === 0) {
        goto(role === "vendor" ? "/auth/register/vendor" : "/auth/login");
    }

    const handleVerify = async () => {
        if (!token) return;

        loading = true;
        error = "";

        try {
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Verification failed");
            }

            verified = true;
        } catch (err: any) {
            error = err.message || "Invalid or expired verification link.";
        } finally {
            loading = false;
        }
    };

    const handleResend = async () => {
        loading = true;
        error = "";

        try {
            const response = await fetch("/api/auth/resend-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            if (!response.ok) {
                throw new Error("Failed to resend verification email");
            }

            error = "Verification email resent! Check your inbox.";
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title={verified ? "Email Verified!" : "Verify Your Email"}
    subtitle={verified
        ? "Redirecting you..."
        : "Check your inbox for the verification link"}
>
    <AuthForm {loading} {error}>
        {#if verified}
            <div class="text-center py-8">
                <div
                    class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce"
                >
                    ✓
                </div>
                <p class="text-body text-text-main font-medium mb-2">
                    Your email has been verified!
                </p>
                <p class="text-sm text-text-muted">
                    Redirecting in {countdown} second{countdown !== 1
                        ? "s"
                        : ""}...
                </p>
            </div>
        {:else}
            <div class="text-center py-6">
                <div
                    class="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl mx-auto mb-4"
                >
                    ✉️
                </div>
                <p class="text-body text-text-muted mb-6">
                    We sent a verification link to your email. Click the link to
                    activate your account.
                </p>

                <div class="space-y-3">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onclick={handleResend}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Resend Verification Email"}
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        class="w-full"
                        href="/auth/login"
                    >
                        Back to Login
                    </Button>
                </div>

                <p class="text-xs text-text-muted mt-4">
                    Didn't receive the email? Check your spam folder or try
                    resending.
                </p>
            </div>
        {/if}
    </AuthForm>
</AuthLayout>
