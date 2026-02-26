<!-- src/routes/auth/register/vendor/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import PasswordInput from "$lib/components/auth/PasswordInput.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import TrustMeter from "$lib/components/auth/TrustMeter.svelte";

    // Form state
    let fullName = "";
    let businessName = "";
    let email = "";
    let phone = "";
    let password = "";
    let agreeTerms = false;
    let loading = false;
    let error = "";

    // Trust score steps preview
    const trustSteps = [
        { label: "Account Setup", points: 10, completed: true },
        { label: "ID Verification", points: 30, completed: false },
        { label: "CAC Verification", points: 30, completed: false },
        { label: "First Sale", points: 15, completed: false },
        { label: "Positive Reviews", points: 15, completed: false },
    ];

    // Validation
    const validate = () => {
        if (!fullName || fullName.length < 2)
            return "Please enter your full name";
        if (!businessName || businessName.length < 2)
            return "Please enter your business name";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Please enter a valid email";
        if (!phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(phone))
            return "Please enter a valid phone number";
        if (!password || password.length < 8)
            return "Password must be at least 8 characters";
        if (!agreeTerms) return "You must agree to the Vendor Terms";
        return null;
    };

    // Submit
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        error = "";

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        try {
            // Save account info to session/storage
            const vendorData = {
                fullName,
                businessName,
                email,
                phone,
                password,
            };
            sessionStorage.setItem(
                "vendorRegistration",
                JSON.stringify(vendorData),
            );

            // Proceed to ID verification
            goto("/auth/register/vendor/verify-id");
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title="Create Vendor Account"
    subtitle="Step 1 of 3: Account Information"
>
    <div class="mb-6">
        <!-- Progress Bar -->
        <div class="flex items-center gap-2 mb-4">
            <div class="flex-1 h-1 bg-primary rounded-full"></div>
            <div class="flex-1 h-1 bg-gray-200 rounded-full"></div>
            <div class="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <p class="text-sm text-text-muted text-center">
            <span class="font-medium text-primary">Account Info</span> → ID Verification
            → CAC (Optional)
        </p>
    </div>

    <!-- Trust Score Preview -->
    <TrustMeter steps={trustSteps} className="mb-6" />

    <AuthForm {loading} {error}>
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
                label="Business Name"
                name="businessName"
                placeholder="Your Business Name"
                required
                bind:value={businessName}
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

            <Input
                label="Phone Number"
                name="phone"
                placeholder="+234 801 234 5678"
                required
                autocomplete="tel"
                bind:value={phone}
            />

            <PasswordInput
                label="Password"
                name="password"
                placeholder="Create a strong password"
                required
                autocomplete="new-password"
                hint="Use 8+ characters with letters, numbers & symbols"
                bind:value={password}
            />

            <label class="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    class="w-4 h-4 mt-1 text-primary rounded border-gray-300"
                    bind:checked={agreeTerms}
                />
                <span class="text-sm text-text-muted">
                    I agree to the <a
                        href="/terms/vendor"
                        class="text-primary hover:underline"
                        >Vendor Terms of Service</a
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
                {loading ? "Saving..." : "Continue to ID Verification"}
            </Button>
        </form>
    </AuthForm>
</AuthLayout>
