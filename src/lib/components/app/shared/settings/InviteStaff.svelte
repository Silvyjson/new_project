<script lang="ts">
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';

  interface StaffMember {
    id: string;
    fullName: string;
    email: string;
    role: 'manager' | 'editor' | 'viewer';
    shop: string;
    status: 'active' | 'pending';
    joinedAt: string;
  }

  let staff = $state<StaffMember[]>([
    { id: 's_001', fullName: 'Alice Johnson', email: 'alice@urbankicks.com', role: 'manager', shop: 'Urbankicks', status: 'active', joinedAt: '2025-01-10' },
    { id: 's_002', fullName: 'Bob Smith', email: 'bob@urbankicks.com', role: 'editor', shop: 'Urbankicks', status: 'active', joinedAt: '2025-02-15' },
    { id: 's_003', fullName: 'Charlie Davis', email: 'charlie@urbankicks.com', role: 'viewer', shop: 'Urbankicks', status: 'pending', joinedAt: '2025-03-01' }
  ]);

  let showInviteForm = $state(false);
  let inviteEmail = $state('');
  let inviteRole = $state<'manager' | 'editor' | 'viewer'>('editor');
  let inviteShop = $state('Urbankicks');
  let loading = $state(false);

  const handleInvite = async (e: Event) => {
    e.preventDefault();
    loading = true;
    try {
      // In real app: API call to invite staff
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newStaff: StaffMember = {
        id: Math.random().toString(),
        fullName: inviteEmail.split('@')[0], // Placeholder
        email: inviteEmail,
        role: inviteRole,
        shop: inviteShop,
        status: 'pending',
        joinedAt: new Date().toISOString().split('T')[0]
      };
      staff = [...staff, newStaff];
      inviteEmail = '';
      showInviteForm = false;
    } finally {
      loading = false;
    }
  };

  const removeStaff = (id: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      staff = staff.filter(s => s.id !== id);
    }
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:account-group-outline" class="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 class="font-semibold text-text-main">Staff Management</h3>
          <p class="text-xs text-text-muted">Manage roles and permissions for your team</p>
        </div>
      </div>
      <Button variant="primary" size="sm" onclick={() => showInviteForm = !showInviteForm}>
        <Icon icon={showInviteForm ? "mdi:close" : "mdi:account-plus-outline"} class="w-4 h-4 mr-2" />
        {showInviteForm ? 'Cancel' : 'Invite Staff'}
      </Button>
    </div>

    {#if showInviteForm}
      <div transition:fade={{ duration: 200 }}>
        <Card className="border border-primary/20 bg-primary/5 p-6">
          <form onsubmit={handleInvite} class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_200px_auto] gap-4 items-end">
              <Input
                label="Staff Email"
                type="email"
                placeholder="email@example.com"
                bind:value={inviteEmail}
                required
              />
              <Input
                label="Shop Name"
                placeholder="e.g. Urbankicks"
                bind:value={inviteShop}
                required
              />
              <div>
                <label for="role" class="block text-sm font-medium text-text-main mb-1.5">Role</label>
                <select
                  id="role"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark bg-surface"
                  bind:value={inviteRole}
                >
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div class="flex items-end">
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Invite'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    {/if}

    <div class="overflow-x-auto rounded-2xl border border-gray-200">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase">Staff Member</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase">Role</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase">Shop</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase">Joined At</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase">Status</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-surface">
          {#each staff as member}
            <tr class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {member.fullName.charAt(0)}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-text-main">{member.fullName}</p>
                    <p class="text-xs text-text-muted">{member.email}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-medium text-text-main capitalize">{member.role}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-medium text-text-main capitalize">{member.shop}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-medium text-text-main capitalize">{member.joinedAt}</span>
              </td>
              <td class="px-6 py-4">
                {#if member.status === 'active'}
                  <span class="px-2 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold">ACTIVE</span>
                {:else}
                  <span class="px-2 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold">PENDING</span>
                {/if}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-text-muted hover:text-primary">
                    <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
                  </button>
                  <button 
                    class="p-2 hover:bg-red-50 rounded-lg transition-colors text-text-muted hover:text-error"
                    onclick={() => removeStaff(member.id)}
                  >
                    <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Card>

