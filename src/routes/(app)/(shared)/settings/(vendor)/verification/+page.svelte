<!-- src/routes/(vendor)/settings/verification/+page.svelte -->
<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import FileUpload from "$lib/components/app/vendor/FileUpload.svelte";

    // Verification status
    let verification = {
        id: { status: "verified", date: "2025-06-15" },
        cac: { status: "pending", date: null },
        bank: { status: "verified", date: "2025-06-16" },
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            verified: { variant: "success" as const, label: "Verified" },
            pending: { variant: "warning" as const, label: "Pending Review" },
            rejected: { variant: "danger" as const, label: "Rejected" },
        };
        return badges[status as keyof typeof badges];
    };

    const formatDate = (date: string | null) => {
        if (!date) return "Not submitted";
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };
</script>

<svelte:head>
    <title>Verification | VendorHub</title>
</svelte:head>

<div class="max-w-[800px] mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/settings"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to Settings
        </a>
    </div>

    <h1 class="text-3xl font-bold text-text-main mb-8">Verification Status</h1>

    <!-- Trust Score Impact -->
    <Card className="border border-gray-200 p-6 mb-8 bg-primary/5">
        <h2 class="text-lg font-bold text-text-main mb-4">
            Trust Score Impact
        </h2>
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-body text-text-muted">ID Verification</span>
                <span class="font-semibold text-success">+30%</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-body text-text-muted">CAC Verification</span>
                <span class="font-semibold text-success">+30%</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-body text-text-muted">Bank Verification</span>
                <span class="font-semibold text-success">+10%</span>
            </div>
            <div class="pt-3 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-text-main">Current Score</span>
                    <span class="text-2xl font-bold text-primary">78%</span>
                </div>
            </div>
        </div>
    </Card>

    <!-- Verification Items -->
    <div class="space-y-6">
        <!-- ID Verification -->
        <Card className="border border-gray-200 p-6">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-bold text-text-main mb-1">
                        ID Verification
                    </h3>
                    <p class="text-sm text-text-muted">
                        Government-issued ID (National ID, Driver's License,
                        Passport)
                    </p>
                </div>
                {#snippet idBadge()}
                    {@const badge = getStatusBadge(verification.id.status)}
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                {/snippet}
                {@render idBadge()}
            </div>
            <div class="text-sm text-text-muted mb-4">
                Submitted: {formatDate(verification.id.date)}
            </div>
            {#if verification.id.status === "verified"}
                <p class="text-success text-sm">
                    ✓ Your ID has been verified successfully.
                </p>
            {/if}
        </Card>

        <!-- CAC Verification -->
        <Card className="border border-gray-200 p-6">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-bold text-text-main mb-1">
                        CAC Verification
                    </h3>
                    <p class="text-sm text-text-muted">
                        Business registration certificate (Optional but
                        recommended)
                    </p>
                </div>
                {#snippet cacBadge()}
                    {@const badge = getStatusBadge(verification.cac.status)}
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                {/snippet}
                {@render cacBadge()}
            </div>
            <div class="text-sm text-text-muted mb-4">
                Submitted: {formatDate(verification.cac.date)}
            </div>
            {#if verification.cac.status === "pending"}
                <div class="space-y-3">
                    <p class="text-warning text-sm">
                        ⏳ Your CAC documents are under review.
                    </p>
                    <Button variant="outline" size="sm" disabled
                        >Resubmit Documents</Button
                    >
                </div>
            {:else if verification.cac.status !== "verified"}
                <div class="space-y-3">
                    <FileUpload
                        label="Upload CAC Certificate"
                        accept="application/pdf,image/*"
                        hint="PDF or image up to 10MB"
                    />
                    <Button variant="primary" size="sm"
                        >Submit for Verification</Button
                    >
                </div>
            {/if}
        </Card>

        <!-- Bank Verification -->
        <Card className="border border-gray-200 p-6">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-bold text-text-main mb-1">
                        Bank Verification
                    </h3>
                    <p class="text-sm text-text-muted">
                        Bank account for withdrawals
                    </p>
                </div>
                {#snippet bankBadge()}
                    {@const badge = getStatusBadge(verification.bank.status)}
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                {/snippet}
                {@render bankBadge()}
            </div>
            <div class="text-sm text-text-muted mb-4">
                Submitted: {formatDate(verification.bank.date)}
            </div>
            {#if verification.bank.status === "verified"}
                <Button variant="outline" size="sm" href="/settings/bank"
                    >Update Bank Details</Button
                >
            {/if}
        </Card>
    </div>
</div>
