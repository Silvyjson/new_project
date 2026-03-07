<!-- src/lib/components/analytics/SmartInsights.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let insights: Array<{
    type: 'warning' | 'success' | 'info';
    title: string;
    message: string;
    action?: string;
  }>;
  
  const getTypeStyles = (type: string) => {
    const styles = {
      warning: { bg: 'bg-warning/10', border: 'border-warning/30', icon: 'mdi:alert-circle', color: 'text-warning' },
      success: { bg: 'bg-success/10', border: 'border-success/30', icon: 'mdi:check-circle', color: 'text-success' },
      info: { bg: 'bg-primary/10', border: 'border-primary/30', icon: 'mdi:information', color: 'text-primary' }
    };
    return styles[type as keyof typeof styles];
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:lightbulb-outline" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Smart Insights</h3>
      <p class="text-xs text-text-muted">AI-powered recommendations</p>
    </div>
  </div>
  
  <div class="space-y-4">
    {#each insights as insight}
      {@const styles = getTypeStyles(insight.type)}
      <div class="p-4 {styles.bg} rounded-xl border {styles.border}">
        <div class="flex items-start gap-3">
          <Icon icon={styles.icon} class="w-5 h-5 {styles.color} flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-text-main mb-1">{insight.title}</h4>
            <p class="text-sm text-text-muted mb-2">{insight.message}</p>
            {#if insight.action}
              <button class="text-sm font-medium text-primary hover:underline">
                {insight.action} →
              </button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</Card>