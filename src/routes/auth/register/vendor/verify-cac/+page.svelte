<!-- src/routes/auth/register/vendor/verify-cac/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import FileUpload from "$lib/components/auth/FileUpload.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import TrustMeter from "$lib/components/auth/TrustMeter.svelte";

    // Form state
    let cacNumber = "";
    let certificate: File | null = null;
    let loading = false;
    let error = "";
    let skipped = false;
    let submitted = false;

    // Trust steps
    const trustSteps = [
        { label: "Account Setup", points: 10, completed: true },
        { label: "ID Verification", points: 30, completed: true },
        { label: "CAC Verification", points: 30, completed: false },
        { label: "First Sale", points: 15, completed: false },
        { label: "Positive Reviews", points: 15, completed: false },
    ];

    // Validate CAC form
    const validate = () => {
        if (!cacNumber || cacNumber.length < 8)
            return "Please enter a valid CAC registration number";
        if (!certificate) return "Please upload your CAC certificate";
        return null;
    };

    // Submit CAC verification
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
            // In real app: Upload to API
            const formData = new FormData();
            formData.append("cacNumber", cacNumber);
            if (certificate) formData.append("certificate", certificate);

            const response = await fetch("/api/auth/vendor/verify-cac", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "CAC verification failed");
            }

            submitted = true;

            // Complete onboarding and redirect
            setTimeout(() => {
                // Clear session data
                sessionStorage.removeItem("vendorRegistration");
                goto("/dashboard/overview");
            }, 3000);
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };

    // Skip CAC verification
    const handleSkip = () => {
        skipped = true;
    };

    const confirmSkip = () => {
        // Clear session and redirect anyway
        sessionStorage.removeItem("vendorRegistration");
        goto("/dashboard/overview?onboarding=partial");
    };
</script>

<AuthLayout
    title="Verify Your Business (Optional)"
    subtitle="Step 3 of 3: CAC Verification"
>
    <div class="mb-6">
        <!-- Progress Bar -->
        <div class="flex items-center gap-2 mb-4">
            <div class="flex-1 h-1 bg-primary rounded-full"></div>
            <div class="flex-1 h-1 bg-primary rounded-full"></div>
            <div
                class="flex-1 h-1 {submitted || skipped
                    ? 'bg-primary'
                    : 'bg-gray-200'} rounded-full"
            ></div>
        </div>
        <p class="text-sm text-text-muted text-center">
            Account Info → ID Verification → <span
                class="font-medium text-primary">CAC (Optional)</span
            >
        </p>
    </div>

    <!-- Trust Score Info -->
    <div class="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p class="text-sm text-text-muted">
            <strong class="text-text-main">Why verify?</strong> CAC verification
            adds 30% to your trust score and unlocks the "Verified Business" badge,
            helping you attract more buyers.
        </p>
    </div>

    <!-- Trust Meter -->
    <TrustMeter steps={trustSteps} className="mb-6" />

    {#if submitted}
        <!-- Success State -->
        <AuthForm
            success="CAC submitted for review! Redirecting to dashboard..."
        >
            <div class="text-center py-8">
                <div
                    class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce"
                >
                    ✓
                </div>
                <p class="text-body text-text-muted mb-2">
                    Your CAC documents are under review.
                </p>
                <p class="text-sm text-text-muted">
                    This usually takes 1-2 business days. You can start selling
                    now!
                </p>
            </div>
        </AuthForm>
    {:else if skipped}
        <!-- Skip Confirmation -->
        <AuthForm>
            <div class="text-center py-6">
                <div
                    class="w-16 h-16 rounded-full bg-warning/20 text-warning flex items-center justify-center text-3xl mx-auto mb-4"
                >
                    ⚠️
                </div>
                <h3 class="text-h3 font-semibold text-text-main mb-2">
                    Skip CAC Verification?
                </h3>
                <p class="text-body text-text-muted mb-6">
                    Skipping means your trust score will start at 40% instead of
                    70%. You can always verify later in your dashboard.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" onclick={() => (skipped = false)}
                        >Go Back</Button
                    >
                    <Button variant="primary" onclick={confirmSkip}
                        >Skip Anyway</Button
                    >
                </div>
            </div>
        </AuthForm>
    {:else}
        <!-- CAC Form -->
        <AuthForm {loading} {error}>
            <form on:submit={handleSubmit} class="space-y-6">
                <Input
                    label="CAC Registration Number"
                    name="cacNumber"
                    placeholder="RC123456 or BN789012"
                    required
                    hint="Found on your CAC certificate"
                    bind:value={cacNumber}
                />

                <FileUpload
                    label="CAC Certificate"
                    accept="application/pdf,image/*"
                    hint="Upload a clear copy of your CAC registration certificate"
                    on:upload={(e) => (certificate = e.detail.file)}
                />

                <div class="flex flex-col sm:flex-row gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        class="flex-1"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit CAC"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onclick={handleSkip}
                    >
                        Skip for Now
                    </Button>
                </div>
            </form>
        </AuthForm>
    {/if}
</AuthLayout>
