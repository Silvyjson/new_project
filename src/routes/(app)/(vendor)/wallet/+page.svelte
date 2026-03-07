<!-- src/routes/(vendor)/wallet/+page.svelte -->
<script lang="ts">
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Input from "$lib/components/common/Input.svelte";
  import { formatNaira } from "$lib/utils/format";

    // Mock wallet data
    let wallet = {
        available: 245000,
        pending: 35000,
        totalWithdrawn: 1200000,
    };

    let withdrawAmount = "";
    let selectedBank = "";
    let loading = false;

    const banks = [
        { id: "gtbank", name: "GTBank" },
        { id: "zenith", name: "Zenith Bank" },
        { id: "access", name: "Access Bank" },
        { id: "uba", name: "UBA" },
    ];

    const transactions = [
        {
            id: 1,
            date: "2026-01-20",
            type: "withdrawal",
            amount: -50000,
            status: "completed",
        },
        {
            id: 2,
            date: "2026-01-18",
            type: "deposit",
            amount: 120000,
            status: "completed",
        },
        {
            id: 3,
            date: "2026-01-15",
            type: "withdrawal",
            amount: -30000,
            status: "pending",
        },
        {
            id: 4,
            date: "2026-01-12",
            type: "deposit",
            amount: 85000,
            status: "completed",
        },
    ];

    const handleWithdraw = async (e: Event) => {
        e.preventDefault();
        loading = true;
        // In real app: API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
    };

    const getTransactionColor = (type: string) => {
        return type === "deposit" ? "text-success" : "text-text-main";
    };

    const getTransactionSign = (type: string) => {
        return type === "deposit" ? "+" : "";
    };
</script>

<svelte:head>
    <title>Wallet | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-text-main mb-8">Wallet</h1>

    <!-- Balance Cards -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
        <Card
            className="border border-gray-200 p-6 bg-gradient-to-br from-primary to-primary-hover text-white"
        >
            <p class="text-sm opacity-90 mb-2">Available Balance</p>
            <p class="text-3xl font-bold">{formatNaira(wallet.available)}</p>
        </Card>
        <Card className="border border-gray-200 p-6">
            <p class="text-sm text-text-muted mb-2">Pending Balance</p>
            <p class="text-3xl font-bold text-text-main">
                {formatNaira(wallet.pending)}
            </p>
        </Card>
        <Card className="border border-gray-200 p-6">
            <p class="text-sm text-text-muted mb-2">Total Withdrawn</p>
            <p class="text-3xl font-bold text-text-main">
                {formatNaira(wallet.totalWithdrawn)}
            </p>
        </Card>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
        <!-- Withdraw Form -->
        <div class="lg:col-span-1">
            <Card className="border border-gray-200 p-6 sticky top-24">
                <h2 class="text-xl font-bold text-text-main mb-6">
                    Withdraw Funds
                </h2>
                <form on:submit={handleWithdraw} class="space-y-4">
                    <Input
                        label="Amount"
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        required
                    />
                    <div>
                        <label
                           for="bank-account"
                            class="block text-sm font-medium text-text-main mb-1.5"
                        >
                            Bank Account
                        </label>
                        <select
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                            bind:value={selectedBank}
                            required
                        >
                            <option value="">Select bank</option>
                            {#each banks as bank}
                                <option value={bank.id}>{bank.name}</option>
                            {/each}
                        </select>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        class="w-full"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Request Withdrawal"}
                    </Button>
                    <p class="text-xs text-text-muted text-center">
                        Withdrawals are processed within 24-48 hours
                    </p>
                </form>
            </Card>
        </div>

        <!-- Transactions -->
        <div class="lg:col-span-2">
            <Card className="border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-text-main mb-6">
                    Transaction History
                </h2>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th
                                    class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Date</th
                                >
                                <th
                                    class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Type</th
                                >
                                <th
                                    class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Status</th
                                >
                                <th
                                    class="text-right py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Amount</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            {#each transactions as transaction}
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4 text-sm text-text-main"
                                        >{transaction.date}</td
                                    >
                                    <td class="py-3 px-4">
                                        <span
                                            class="text-sm font-medium text-text-main capitalize"
                                            >{transaction.type}</span
                                        >
                                    </td>
                                    <td class="py-3 px-4">
                                        <span
                                            class="text-sm {transaction.status ===
                                            'completed'
                                                ? 'text-success'
                                                : 'text-warning'} capitalize"
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4 text-right">
                                        <span
                                            class="text-sm font-semibold {getTransactionColor(
                                                transaction.type,
                                            )}"
                                        >
                                            {getTransactionSign(
                                                transaction.type,
                                            )}{formatNaira(
                                                Math.abs(transaction.amount),
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    </div>
</div>
