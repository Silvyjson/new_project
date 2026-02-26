<!-- src/routes/auth/register/buyer/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import PasswordInput from "$lib/components/auth/PasswordInput.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Form state
    let fullName = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let agreeTerms = false;
    let loading = false;
    let error = "";
    let success = "";

    // Validation
    const validate = () => {
        if (!fullName || fullName.length < 2)
            return "Please enter your full name";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Please enter a valid email";
        if (!password || password.length < 8)
            return "Password must be at least 8 characters";
        if (password !== confirmPassword) return "Passwords do not match";
        if (!agreeTerms) return "You must agree to the Terms & Privacy";
        return null;
    };

    // Submit
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
            // API call to register buyer
            const response = await fetch("/api/auth/register/buyer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Registration failed");
            }

            success =
                "Account created! Please check your email to verify your account.";

            // Redirect after short delay
            setTimeout(() => goto("/auth/verify-email?role=buyer"), 2000);
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title="Create Buyer Account"
    subtitle="Start shopping with confidence"
>
    <AuthForm {loading} {error} {success}>
        <form on:submit={handleSubmit} class="space-y-5">
            <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                required
                autocomplete="name"
                bind:value={fullName}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autocomplete="email"
                bind:value={email}
            />

            <PasswordInput
                label="Password"
                name="password"
                placeholder="Create a strong password"
                required
                autocomplete="new-password"
                hint="Use 8+ characters with a mix of letters, numbers & symbols"
                bind:value={password}
            />

            <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                autocomplete="new-password"
                bind:value={confirmPassword}
            />

            <label class="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    class="w-4 h-4 mt-1 text-primary rounded border-gray-300"
                    bind:checked={agreeTerms}
                />
                <span class="text-sm text-text-muted">
                    I agree to the <a
                        href="/terms"
                        class="text-primary hover:underline">Terms of Service</a
                    >
                    and
                    <a href="/privacy" class="text-primary hover:underline"
                        >Privacy Policy</a
                    >.
                </span>
            </label>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Create Account"}
            </Button>
        </form>

        <svelte:fragment slot="footer">
            <p class="text-center text-sm text-text-muted">
                Already have an account?
                <a
                    href="/auth/login"
                    class="text-primary font-medium hover:underline">Sign in</a
                >
            </p>
        </svelte:fragment>
    </AuthForm>
</AuthLayout>
