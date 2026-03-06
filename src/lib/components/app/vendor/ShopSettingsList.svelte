<!-- src/lib/components/vendor/ShopSettingsList.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";

    export let shopId: string;

    const settings = [
        {
            title: "Edit Shop Info",
            description: "Update name, description, and category",
            icon: "mdi:pencil-outline",
            href: `/my-shop/${shopId}/edit`,
        },
        {
            title: "Change Cover Photo",
            description: "Update your shop banner image",
            icon: "mdi:image-outline",
            href: `/my-shop/${shopId}/edit#cover`,
        },
        {
            title: "Update Logo",
            description: "Change your shop logo",
            icon: "mdi:image-edit-outline",
            href: `/my-shop/${shopId}/edit#logo`,
        },
        {
            title: "Business Verification",
            description: "Manage ID and CAC verification",
            icon: "mdi:shield-check-outline",
            href: `/my-shop/${shopId}/verification`,
        },
        {
            title: "Shipping Settings",
            description: "Configure delivery options",
            icon: "mdi:truck-delivery-outline",
            href: `/my-shop/${shopId}/shipping`,
        },
        {
            title: "Theme Settings",
            description: "Customize shop appearance",
            icon: "mdi:palette-outline",
            href: `/my-shop/${shopId}/theme`,
        },
    ];
</script>

<Card className="border border-gray-200 p-6">
    <h3 class="text-lg font-bold text-text-main mb-6">Shop Settings</h3>

    <div class="space-y-1">
        {#each settings as setting}
            <a
                href={setting.href}
                class="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
                <div
                    class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                >
                    <Icon
                        icon={setting.icon}
                        class="w-5 h-5 text-primary group-hover:text-primary"
                    />
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-text-main text-sm">
                        {setting.title}
                    </h4>
                    <p class="text-xs text-text-muted">{setting.description}</p>
                </div>
                <Icon
                    icon="mdi:chevron-right"
                    class="w-5 h-5 text-text-muted group-hover:text-primary"
                />
            </a>
        {/each}
    </div>
</Card>
