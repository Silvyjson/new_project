<!-- src/lib/components/orders/OrderStatus.svelte -->
<script lang="ts">
  export let status: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const getStatusStyles = (status: string) => {
    const styles = {
      pending: 'bg-warning/10 text-warning',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-success/10 text-success',
      cancelled: 'bg-error/10 text-error'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };
</script>

<span class="inline-flex items-center font-medium rounded-full {getStatusStyles(status)} {sizeClasses[size]}">
  {status.charAt(0).toUpperCase() + status.slice(1)}
</span>