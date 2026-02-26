<!-- src/routes/auth/forgot-password/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    let email = "";
    let loading = false;
    let error = "";
    let success = "";

    const validate = () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address";
        }
        return null;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        error = "";
        success = "";

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to send reset link");
            }

            success = "Check your email for password reset instructions.";

            // Auto-redirect after delay
            setTimeout(() => goto("/auth/login"), 4000);
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title="Reset Your Password"
    subtitle="Enter your email to receive a reset link"
>
    <AuthForm {loading} {error} {success}>
        {#if success}
            <div class="text-center py-8">
                <div
                    class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl mx-auto mb-4"
                >
                    ✉️
                </div>
                <p class="text-body text-text-muted">{success}</p>
                <p class="text-sm text-text-muted mt-2">
                    Redirecting to login...
                </p>
            </div>
        {:else}
            <form on:submit={handleSubmit} class="space-y-5">
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    autocomplete="email"
                    bind:value={email}
                    className="w-full"
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
            </form>
        {/if}

        <svelte:fragment slot="footer">
            <p class="text-center text-sm text-text-muted">
                Remember your password?
                <a
                    href="/auth/login"
                    class="text-primary font-medium hover:underline">Sign in</a
                >
            </p>
        </svelte:fragment>
    </AuthForm>
</AuthLayout>
