<!-- src/lib/components/cart/CheckoutSteps.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export let currentStep: number;
  
  const steps = [
    { id: 1, label: 'Cart', icon: 'mdi:cart-outline' },
    { id: 2, label: 'Address', icon: 'mdi:map-marker-outline' },
    { id: 3, label: 'Payment', icon: 'mdi:credit-card-outline' },
    { id: 4, label: 'Review', icon: 'mdi:check-circle-outline' }
  ];
</script>

<div class="flex items-center justify-between mb-8">
  {#each steps as step, i}
    <div class="flex items-center">
      <div class="flex flex-col items-center">
        <div class="w-10 h-10 rounded-full {currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-text-muted'} flex items-center justify-center">
          {#if currentStep > step.id}
            <Icon icon="mdi:check" class="w-5 h-5" />
          {:else}
            <Icon icon={step.icon} class="w-5 h-5" />
          {/if}
        </div>
        <span class="text-xs text-text-muted mt-2 hidden md:block">{step.label}</span>
      </div>
      {#if i < steps.length - 1}
        <div class="w-16 md:w-24 h-0.5 {currentStep > step.id ? 'bg-primary' : 'bg-gray-200'} mx-2"></div>
      {/if}
    </div>
  {/each}
</div>