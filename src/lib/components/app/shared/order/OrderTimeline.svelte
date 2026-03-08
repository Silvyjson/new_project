<!-- src/lib/components/orders/OrderTimeline.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let status: string = '';
  export let timeline: Array<{
    stage: string;
    description: string;
    date?: string;
    icon: string;
    completed: boolean;
    current: boolean;
  }>;
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };
</script>

<Card className="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-6">Order Status</h3>
  
  <div class="space-y-6">
    {#each timeline as step, i}
      <div class="relative">
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full {step.completed ? 'bg-success/20 text-success' : step.current ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-400'} flex items-center justify-center">
              {#if step.completed}
                <Icon icon="mdi:check" class="w-5 h-5" />
              {:else}
                <Icon icon={step.icon} class="w-5 h-5" />
              {/if}
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-semibold text-text-main">{step.stage}</h4>
              {#if step.current}
                <Badge variant="info" size="sm">Current</Badge>
              {/if}
            </div>
            <p class="text-sm text-text-muted mb-1">{step.description}</p>
            {#if step.date}
              <p class="text-xs text-text-muted">{formatDate(step.date)}</p>
            {/if}
          </div>
        </div>
        
        <!-- Connector Line -->
        {#if i < timeline.length - 1}
          <div class="absolute left-5 top-10 w-0.5 h-6 {step.completed ? 'bg-success' : 'bg-gray-200'}"></div>
        {/if}
      </div>
    {/each}
  </div>
</Card>