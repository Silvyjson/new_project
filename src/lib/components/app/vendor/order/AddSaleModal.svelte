<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';

  interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (sale: any) => void;
  }

  let { show, onClose, onSave }: Props = $props();

  let customerName = $state('');
  let productName = $state('');
  let amount = $state<number | null>(null);
  let paymentStatus = $state('PAID');
  let paymentMethod = $state('CASH');
  let saleDate = $state(new Date().toISOString().split('T')[0]);
  let note = $state('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const sale = {
      customerName,
      productName,
      amount,
      paymentStatus,
      paymentMethod,
      saleDate,
      note,
      source: 'EXTERNAL'
    };
    onSave(sale);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    customerName = '';
    productName = '';
    amount = null;
    paymentStatus = 'PAID';
    paymentMethod = 'CASH';
    saleDate = new Date().toISOString().split('T')[0];
    note = '';
  };
</script>

{#if show}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onmousedown={onClose}
    role="button"
    tabindex="-1"
    aria-label="Close modal"
  >
    <div 
      class="bg-surface w-full h-120 overflow-y-auto max-w-lg rounded-2xl shadow-xl overflow-hidden"
      transition:scale={{ duration: 200, start: 0.95 }}
      onmousedown={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-xl font-bold text-text-main">Add External Sale</h2>
        <button 
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onclick={onClose}
        >
          <Icon icon="mdi:close" class="w-5 h-5 text-text-muted" />
        </button>
      </div>

      <form onsubmit={handleSubmit} class="p-6 space-y-4">
        <Input 
          id="customer-name"
          name="customerName"
          label="Customer Name" 
          placeholder="e.g. John Doe" 
          required 
          bind:value={customerName}
        />

        <Input 
          id="product-name"
          name="productName"
          label="Product Name" 
          placeholder="e.g. Wireless Headphones" 
          required 
          bind:value={productName}
        />

        <div class="grid grid-cols-2 gap-4">
          <Input 
            id="amount"
            name="amount"
            label="Amount (₦)" 
            type="number" 
            placeholder="0.00" 
            required 
            bind:value={amount}
          />
          <div>
            <label for="sale-date" class="block text-sm font-medium text-text-main mb-1.5">Sale Date</label>
            <input 
              id="sale-date"
              type="date" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark mb-4"
              bind:value={saleDate}
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="payment-status" class="block text-sm font-medium text-text-main mb-1.5">Payment Status</label>
            <select 
              id="payment-status"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark bg-surface"
              bind:value={paymentStatus}
            >
              <option value="PAID">Paid</option>
              <option value="PARTIAL">Partial</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div>
            <label for="payment-method" class="block text-sm font-medium text-text-main mb-1.5">Payment Method</label>
            <select 
              id="payment-method"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark bg-surface"
              bind:value={paymentMethod}
            >
              <option value="CASH">Cash</option>
              <option value="TRANSFER">Bank Transfer</option>
              <option value="POS">POS</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label for="note" class="block text-sm font-medium text-text-main mb-1.5">Note (Optional)</label>
          <textarea 
            id="note"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark min-h-[100px]"
            placeholder="Additional details about this sale..."
            bind:value={note}
          ></textarea>
        </div>

        <div class="flex items-center gap-3 pt-4">
          <Button variant="outline" class="flex-1" onclick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" class="flex-1">Record Sale</Button>
        </div>
      </form>
    </div>
  </div>
{/if}
