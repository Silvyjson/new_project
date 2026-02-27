// src/lib/stores/notifications.ts
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

interface Notification {
  id: number;
  type: 'order' | 'promo' | 'review' | 'follow' | 'security';
  message: string;
  time: string;
  unread: boolean;
  icon: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: true
};

export const notificationsStore = writable<NotificationState>(initialState);

export const notificationsActions = {
  markAsRead: (id: number) => {
    notificationsStore.update(state => ({
      ...state,
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, unread: false } : n
      )
    }));
  },
  
  markAllAsRead: () => {
    notificationsStore.update(state => ({
      ...state,
      notifications: state.notifications.map(n => ({ ...n, unread: false }))
    }));
  },
  
  addNotification: (notification: Notification) => {
    notificationsStore.update(state => ({
      ...state,
      notifications: [notification, ...state.notifications]
    }));
  },
  
  init: async () => {
    if (!browser) return;
    
    try {
      // In real app: Fetch from API
      const response = await fetch('/api/notifications');
      const notifications = await response.json();
      notificationsStore.set({ notifications, loading: false });
    } catch (err) {
      console.error('Failed to load notifications:', err);
      notificationsStore.set(initialState);
    }
  }
};

// Derived stores
export const unreadCount = derived(notificationsStore, $notifications =>
  $notifications.notifications.filter(n => n.unread).length
);

export const groupedNotifications = derived(notificationsStore, $notifications => {
  const grouped: Record<string, Notification[]> = {
    today: [],
    thisWeek: [],
    earlier: []
  };
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  $notifications.notifications.forEach(notification => {
    const time = new Date(notification.time);
    
    if (time >= today) {
      grouped.today.push(notification);
    } else if (time >= weekAgo) {
      grouped.thisWeek.push(notification);
    } else {
      grouped.earlier.push(notification);
    }
  });
  
  return grouped;
});

// Initialize on client
if (browser) {
  notificationsActions.init();
}