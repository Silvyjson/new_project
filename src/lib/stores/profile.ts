// src/lib/stores/profile.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  memberSince: string;
  totalOrders: number;
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: true,
  error: null
};

export const profileStore = writable<ProfileState>(initialState);

export const profileActions = {
  updateProfile: async (data: Partial<UserProfile>) => {
    profileStore.update(state => ({ ...state, loading: true, error: null }));
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const profile = await response.json();
      profileStore.set({ profile, loading: false, error: null });
      
      if (browser) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
      
      return { success: true };
    } catch (err: any) {
      profileStore.update(state => ({
        ...state,
        loading: false,
        error: err.message
      }));
      return { success: false, error: err.message };
    }
  },
  
  init: async () => {
    if (!browser) return;
    
    try {
      const stored = localStorage.getItem('profile');
      if (stored) {
        const profile = JSON.parse(stored);
        profileStore.set({ profile, loading: false, error: null });
      } else {
        const response = await fetch('/api/profile');
        const profile = await response.json();
        profileStore.set({ profile, loading: false, error: null });
        
        if (browser) {
          localStorage.setItem('profile', JSON.stringify(profile));
        }
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      profileStore.set(initialState);
    }
  }
};

// Initialize on client
if (browser) {
  profileActions.init();
}