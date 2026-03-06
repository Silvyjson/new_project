<!-- src/routes/(vendor)/settings/bank/+page.svelte -->
<script lang="ts">
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Input from "$lib/components/common/Input.svelte";
    import Badge from "$lib/components/common/Badge.svelte";

    // Bank details
    let bank = {
        bankName: "GTBank",
        accountNumber: "0123456789",
        accountName: "Divine Stores",
        verified: true,
    };

    let loading = false;
    let success = "";
    let error = "";

    const banks = [
        { id: "gtbank", name: "GTBank" },
        { id: "zenith", name: "Zenith Bank" },
        { id: "access", name: "Access Bank" },
        { id: "uba", name: "UBA" },
        { id: "firstbank", name: "First Bank" },
    ];

    const handleUpdate = async (e: Event) => {
        e.preventDefault();
        loading = true;
        error = "";
        success = "";

        // In real app: API call to update bank details
        await new Promise((resolve) => setTimeout(resolve, 1000));

        success = "Bank details updated successfully!";
        loading = false;
    };
</script>

<svelte:head>
    <title>Bank Details | VendorHub</title>
</svelte:head>

<div class="max-w-[600px] mx-auto px-4 py-8">
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

    <h1 class="text-3xl font-bold text-text-main mb-8">Bank Details</h1>

    <Card className="border border-gray-200 p-6">
        {#if bank.verified}
            <div
                class="flex items-center gap-3 mb-6 p-4 bg-success/10 border border-success/30 rounded-xl"
            >
                <span class="text-2xl">✓</span>
                <div>
                    <p class="font-semibold text-success">
                        Bank Account Verified
                    </p>
                    <p class="text-sm text-text-muted">
                        You can receive withdrawals to this account
                    </p>
                </div>
            </div>
        {/if}

        <form on:submit={handleUpdate} class="space-y-6">
            <div>
                <label for="bank-name" class="block text-sm font-medium text-text-main mb-1.5">
                    Bank Name
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                    bind:value={bank.bankName}
                    required
                >
                    {#each banks as b}
                        <option value={b.name}>{b.name}</option>
                    {/each}
                </select>
            </div>

            <Input
                label="Account Number"
                name="accountNumber"
                type="text"
                value={bank.accountNumber}
                required
                placeholder="10-digit account number"
            />

            <Input
                label="Account Name"
                name="accountName"
                type="text"
                value={bank.accountName}
                required
                disabled
                hint="Auto-filled from account number"
            />

            {#if success}
                <div
                    class="p-4 bg-success/10 border border-success/30 rounded-xl text-success text-sm"
                >
                    {success}
                </div>
            {/if}

            {#if error}
                <div
                    class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm"
                >
                    {error}
                </div>
            {/if}

            <div class="flex gap-3 pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Bank Details"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    href="/settings"
                >
                    Cancel
                </Button>
            </div>
        </form>
    </Card>
</div>
