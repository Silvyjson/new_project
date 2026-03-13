<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "$lib/components/common/Button.svelte";
  import { fade } from "svelte/transition";

  interface BroadcastData {
    subject: string;
    message: string;
    isScheduled: boolean;
    scheduledDate: string;
    scheduledTime: string;
  }

  interface Props {
    targetCount: number;
    targetDescription: string;
    onSubmit: (data: BroadcastData) => void;
    onCancel: () => void;
    loading?: boolean;
  }

  let { 
    targetCount, 
    targetDescription, 
    onSubmit, 
    onCancel, 
    loading = false 
  }: Props = $props();

  let form = $state<BroadcastData>({
    subject: '',
    message: '',
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: ''
  });

  const handleSubmit = () => {
    onSubmit({ ...form });
  };
</script>

<div class="space-y-4">
  <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:bullhorn" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="text-xl font-bold text-text-main">Send Broadcast</h3>
      <p class="text-xs text-text-muted mt-0.5">
        Targeting {targetCount} {targetDescription}
      </p>
    </div>
  </div>

  <div class="space-y-4">
    <div>
      <label for="subject" class="block text-sm font-medium text-text-main mb-1.5">Subject</label>
      <input
        id="subject"
        type="text"
        placeholder="e.g. Special Weekend Discount!"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        bind:value={form.subject}
        disabled={loading}
      />
    </div>
    
    <div>
      <label for="message" class="block text-sm font-medium text-text-main mb-1.5">Message</label>
      <textarea
        id="message"
        placeholder="Type your message here..."
        rows="5"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
        bind:value={form.message}
        disabled={loading}
      ></textarea>
    </div>

    <!-- Scheduling -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-semibold text-text-main">Delivery Time</h4>
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="delivery" 
              checked={!form.isScheduled} 
              oninput={() => form.isScheduled = false}
              class="w-4 h-4 text-primary focus:ring-primary"
            />
            <span class="text-xs text-text-main">Send Now</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="delivery" 
              checked={form.isScheduled} 
              oninput={() => form.isScheduled = true}
              class="w-4 h-4 text-primary focus:ring-primary"
            />
            <span class="text-xs text-text-main">Schedule Later</span>
          </label>
        </div>
      </div>

      {#if form.isScheduled}
        <div class="grid grid-cols-2 gap-4 animate-fade-in" in:fade={{ duration: 200 }}>
          <div>
            <label for="date" class="block text-xs font-medium text-text-muted mb-1">Date</label>
            <input
              id="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary outline-none text-sm"
              bind:value={form.scheduledDate}
              disabled={loading}
            />
          </div>
          <div>
            <label for="time" class="block text-xs font-medium text-text-muted mb-1">Time</label>
            <input
              id="time"
              type="time"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary outline-none text-sm"
              bind:value={form.scheduledTime}
              disabled={loading}
            />
          </div>
        </div>
      {/if}
    </div>

    <div class="bg-primary/5 rounded-lg p-4 flex gap-3">
      <Icon icon="mdi:information-outline" class="w-5 h-5 text-primary shrink-0" />
      <p class="text-xs text-text-muted leading-relaxed">
        Broadcasts will be sent as notifications and emails to your followers. Please ensure your message complies with our community guidelines.
      </p>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
    <Button 
      variant="outline" 
      size="md" 
      onclick={onCancel}
      disabled={loading}
      className="w-full sm:w-auto"
    >
      Cancel
    </Button>
    <Button 
      variant="primary" 
      size="md" 
      onclick={handleSubmit}
      loading={loading}
      disabled={
        !form.subject || 
        !form.message || 
        (form.isScheduled && (!form.scheduledDate || !form.scheduledTime)) ||
        loading
      }
      className="w-full sm:w-auto"
    >
      {loading ? 'Sending...' : form.isScheduled ? 'Schedule Broadcast' : 'Send Broadcast'}
    </Button>
  </div>
</div>
