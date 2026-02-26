<!-- src/routes/auth/reset-password/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import PasswordInput from "$lib/components/auth/PasswordInput.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Get token from URL
    let token = "";
    $: if ($page.url.searchParams.has("token")) {
        token = $page.url.searchParams.get("token") || "";
    }

    let newPassword = "";
    let confirmPassword = "";
    let loading = false;
    let error = "";
    let success = "";

    const validate = () => {
        if (!newPassword || newPassword.length < 8)
            return "Password must be at least 8 characters";
        if (newPassword !== confirmPassword) return "Passwords do not match";
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

        if (!token) {
            error = "Invalid or expired reset link. Please request a new one.";
            return;
        }

        loading = true;

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to reset password");
            }

            success = "Password updated successfully! Redirecting to login...";

            setTimeout(() => goto("/auth/login"), 3000);
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title="Create New Password"
    subtitle="Enter your new password below"
>
    <AuthForm {loading} {error} {success}>
        {#if success}
            <div class="text-center py-8">
                <div
                    class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl mx-auto mb-4"
                >
                    ✓
                </div>
                <p class="text-body text-text-muted">{success}</p>
            </div>
        {:else}
            <form on:submit={handleSubmit} class="space-y-5">
                <PasswordInput
                    label="New Password"
                    name="newPassword"
                    placeholder="Create a strong password"
                    required
                    autocomplete="new-password"
                    hint="Use 8+ characters with letters, numbers & symbols"
                    bind:value={newPassword}
                />

                <PasswordInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    required
                    autocomplete="new-password"
                    bind:value={confirmPassword}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    class="w-full"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        {/if}

        <svelte:fragment slot="footer">
            <p class="text-center text-sm text-text-muted">
                <a
                    href="/auth/forgot-password"
                    class="text-primary font-medium hover:underline"
                    >Request new reset link</a
                >
            </p>
        </svelte:fragment>
    </AuthForm>
</AuthLayout>
