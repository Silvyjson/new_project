<!-- src/lib/components/wallet/ExportOptions.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let dateFrom: string;
  export let dateTo: string;
  export let totalTransactions: number;
  
  let exportFormat = 'csv';
  
  const handleExport = () => {
    // In real app: generate and download file
    const format = exportFormat.toUpperCase();
    alert(`Exporting ${totalTransactions} transactions to ${format}...`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:download" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Export Transactions</h3>
      <p class="text-xs text-text-muted">Download your transaction history</p>
    </div>
  </div>
  
  <div class="space-y-4">
    <!-- Date Range Summary -->
    <div class="p-4 bg-gray-50 rounded-xl">
      <p class="text-sm text-text-muted mb-2">Exporting transactions from:</p>
      <p class="font-medium text-text-main">
        {new Date(dateFrom).toLocaleDateString()} → {new Date(dateTo).toLocaleDateString()}
      </p>
      <p class="text-sm text-text-muted mt-1">
        {totalTransactions} transactions found
      </p>
    </div>
    
    <!-- Format Selection -->
    <div>
      <label class="block text-sm font-medium text-text-main mb-2">Format</label>
      <div class="flex gap-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="format"
            value="csv"
            bind:group={exportFormat}
            class="w-4 h-4 text-primary"
          />
          <span class="text-body text-text-main">CSV</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="format"
            value="pdf"
            bind:group={exportFormat}
            class="w-4 h-4 text-primary"
          />
          <span class="text-body text-text-main">PDF</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="format"
            value="excel"
            bind:group={exportFormat}
            class="w-4 h-4 text-primary"
          />
          <span class="text-body text-text-main">Excel</span>
        </label>
      </div>
    </div>
    
    <!-- Export Button -->
    <Button variant="primary" size="lg" class="w-full" onclick={handleExport}>
      <Icon icon="mdi:file-download-outline" class="w-5 h-5 mr-2" />
      Export to {exportFormat.toUpperCase()}
    </Button>
    
    <p class="text-xs text-text-muted text-center">
      Exports include: Date, Reference, Type, Amount, Status, Description
    </p>
  </div>
</Card>