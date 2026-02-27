// src/lib/stores/cart.ts
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

interface CartItem {
  id: string;
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: true
};

export const cartStore = writable<CartState>(initialState);

export const cartActions = {
  addItem: (item: CartItem) => {
    cartStore.update(state => {
      const existingIndex = state.items.findIndex(
        i => i.productId === item.productId && i.variant === item.variant
      );
      
      if (existingIndex > -1) {
        state.items[existingIndex].quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      
      return { ...state, loading: false };
    });
    
    if (browser) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  },
  
  removeItem: (itemId: string) => {
    cartStore.update(state => ({
      ...state,
      items: state.items.filter(i => i.id !== itemId)
    }));
  },
  
  updateQuantity: (itemId: string, quantity: number) => {
    cartStore.update(state => ({
      ...state,
      items: state.items.map(i =>
        i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    }));
  },
  
  clearCart: () => {
    cartStore.set({ items: [], loading: false });
    if (browser) {
      localStorage.removeItem('cart');
    }
  },
  
  init: () => {
    if (!browser) return;
    
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const items = JSON.parse(stored);
        cartStore.set({ items, loading: false });
      } else {
        cartStore.set(initialState);
      }
    } catch (err) {
      console.error('Failed to initialize cart:', err);
      cartStore.set(initialState);
    }
  }
};

// Derived stores
export const cartCount = derived(cartStore, $cart =>
  $cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = derived(cartStore, $cart =>
  $cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

export const cartByVendor = derived(cartStore, $cart => {
  const grouped: Record<string, CartItem[]> = {};
  
  $cart.items.forEach(item => {
    if (!grouped[item.vendorId]) {
      grouped[item.vendorId] = [];
    }
    grouped[item.vendorId].push(item);
  });
  
  return grouped;
});

// Initialize on client
if (browser) {
  cartActions.init();
}