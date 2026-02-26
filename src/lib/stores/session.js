import { writable } from 'svelte/store';

export const session = writable({
  isAuthenticated: false,
  role: null
});
