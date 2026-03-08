<!-- src/lib/components/notifications/EmptyNotifications.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
</script>

<Card className="border border-gray-200 py-16 text-center">
  <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
    <Icon icon="mdi:bell-check-outline" class="w-10 h-10 text-primary" />
  </div>
  
  <h2 class="text-h2 text-text-main mb-2">You're all caught up</h2>
  <p class="text-body text-text-muted mb-8 max-w-md mx-auto">
    No new notifications. Check back later for updates on your orders, shops, and account.
  </p>
  
  <div class="flex flex-col sm:flex-row gap-3 justify-center">
    <Button variant="primary" size="lg" href="/dashboard">
      Go to Dashboard
    </Button>
    <Button variant="outline" size="lg" href="/settings/notifications">
      <Icon icon="mdi:cog-outline" class="w-5 h-5 mr-2" />
      Notification Settings
    </Button>
  </div>
  
  <!-- Tips -->
  <div class="mt-12 pt-8 border-t border-gray-200">
    <p class="text-sm font-medium text-text-main mb-4">Tips to stay updated</p>
    <div class="grid md:grid-cols-3 gap-4 text-left">
      <div class="p-4 bg-gray-50 rounded-xl">
        <Icon icon="mdi:bell-ring-outline" class="w-6 h-6 text-primary mb-2" />
        <p class="text-sm text-text-muted">Enable push notifications in your browser</p>
      </div>
      <div class="p-4 bg-gray-50 rounded-xl">
        <Icon icon="mdi:email-outline" class="w-6 h-6 text-primary mb-2" />
        <p class="text-sm text-text-muted">Check your email for important updates</p>
      </div>
      <div class="p-4 bg-gray-50 rounded-xl">
        <Icon icon="mdi:account-check-outline" class="w-6 h-6 text-primary mb-2" />
        <p class="text-sm text-text-muted">Keep your notification preferences up to date</p>
      </div>
    </div>
  </div>
</Card>