<!-- src/lib/components/vendor/ShopEmptyState.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
</script>

<!-- Empty Shops -->
<Card className="py-14 text-center border-2 border-dashed border-gray-300">
    <Icon
        icon="mdi:store-outline"
        class="w-14 h-14 mx-auto mb-4 text-gray-400"
    />

    <h2 class="text-lg font-semibold text-text-main mb-2">No Shops Yet</h2>

    <p class="text-sm text-text-muted mb-5 max-w-sm mx-auto">
        Create your first shop and start selling on VendorHub.
    </p>

    <Button href="/my-shop/create" variant="primary">
        <Icon icon="mdi:store-plus-outline" class="w-4 h-4 mr-2" />
        Create Shop
    </Button>
</Card>
