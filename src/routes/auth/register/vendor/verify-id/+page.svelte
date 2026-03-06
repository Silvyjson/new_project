<!-- src/routes/auth/register/vendor/verify-id/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
    import AuthForm from "$lib/components/auth/AuthForm.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import FileUpload from "$lib/components/auth/FileUpload.svelte";
    // import TrustMeter from "$lib/components/auth/TrustMeter.svelte";

    // Upload state
    let idFront: File | null = null;
    let idBack: File | null = null;
    let selfie: File | null = null;
    let idType = "national-id";
    let loading = false;
    let error = "";
    let submitted = false;

    // Trust steps
    const trustSteps = [
        { label: "Account Setup", points: 10, completed: true },
        { label: "ID Verification", points: 30, completed: false },
        { label: "CAC Verification", points: 30, completed: false },
        { label: "First Sale", points: 15, completed: false },
        { label: "Positive Reviews", points: 15, completed: false },
    ];

    // Handle file upload
    const handleFileUpload = (
        file: File,
        type: "front" | "back" | "selfie",
    ) => {
        if (type === "front") idFront = file;
        if (type === "back") idBack = file;
        if (type === "selfie") selfie = file;
    };

    // Validate uploads
    const validate = () => {
        if (!idFront) return "Please upload the front of your ID";
        if (!idBack) return "Please upload the back of your ID";
        if (!selfie) return "Please take a selfie for verification";
        return null;
    };

    // Submit verification
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
            // In real app: Upload files to API
            const formData = new FormData();
            if (idFront) formData.append("idFront", idFront);
            if (idBack) formData.append("idBack", idBack);
            if (selfie) formData.append("selfie", selfie);
            formData.append("idType", idType);

            const response = await fetch("/api/auth/vendor/verify-id", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Verification failed");
            }

            submitted = true;

            // Auto-redirect to CAC step after delay
            setTimeout(() => goto("/auth/register/vendor/verify-cac"), 3000);
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<AuthLayout
    title="Verify Your Identity"
    subtitle="Step 2 of 2: ID Verification"
>
    <div class="mb-6">
        <!-- Progress Bar -->
        <div class="flex items-center gap-2 mb-4">
            <div class="flex-1 h-1 bg-primary rounded-full"></div>
            <div class="flex-1 h-1 bg-primary rounded-full"></div>
        </div>
        <p class="text-sm text-text-muted text-center">
            Account Info → <span class="font-medium text-primary"
                >ID Verification</span
            >
        </p>
    </div>

    <!-- Trust Score Info -->
    <div class="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p class="text-sm text-text-muted">
            <strong class="text-text-main">Why verify?</strong> ID verification increases
            your trust score by 30%, helping buyers feel confident shopping with
            you.
        </p>
    </div>

    {#if submitted}
        <!-- Success State -->
        <AuthForm
            success="ID submitted for review! Redirecting to next step..."
        >
            <div class="text-center py-8">
                <div
                    class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl mx-auto mb-4"
                >
                    ✓
                </div>
                <p class="text-body text-text-muted">
                    Your ID is under review. This usually takes 1-2 business
                    hours.
                </p>
            </div>
        </AuthForm>
    {:else}
        <!-- Upload Form -->
        <AuthForm {loading} {error}>
            <form on:submit={handleSubmit} class="space-y-6">
                <!-- ID Type Selector -->
                <div>
                    <label
                        for="id-type"
                        class="block text-sm font-medium text-text-main mb-2"
                        >ID Type</label
                    >
                    <select
                        id="id-type"
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                        bind:value={idType}
                    >
                        <option value="national-id">National ID Card</option>
                        <option value="drivers-license">Driver's License</option
                        >
                        <option value="passport">International Passport</option>
                        <option value="voters-card">Voter's Card</option>
                    </select>
                </div>

                <!-- ID Uploads -->
                <div class="grid md:grid-cols-2 gap-4">
                    <FileUpload
                        label="Front of ID"
                        accept="image/*"
                        hint="Clear photo of the front side"
                        on:upload={(e) =>
                            handleFileUpload(e.detail.file, "front")}
                    />
                    <FileUpload
                        label="Back of ID"
                        accept="image/*"
                        hint="Clear photo of the back side"
                        on:upload={(e) =>
                            handleFileUpload(e.detail.file, "back")}
                    />
                </div>

                <!-- Selfie Capture -->
                <FileUpload
                    label="Live Selfie"
                    accept="image/*"
                    hint="Take a clear selfie holding your ID"
                    capture="user"
                    on:upload={(e) => handleFileUpload(e.detail.file, "selfie")}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit for Verification"}
                </Button>
            </form>
        </AuthForm>
    {/if}
</AuthLayout>
