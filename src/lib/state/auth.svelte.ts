// src/lib/state/auth.svelte.ts
import { browser } from "$app/environment";

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export type UserRole = "buyer" | "vendor";

class AuthState {
  role = $state<UserRole>("buyer");
  isLoggedIn = $state(true);
  user = $state<User>({
    name: "John Ade",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JA",
  });

  constructor() {
    if (browser) {
      const storedRole = localStorage.getItem("simulated_role");
      if (storedRole === "buyer" || storedRole === "vendor") {
        this.role = storedRole;
      }
    }
  }

  setRole(role: UserRole) {
    this.role = role;
    if (browser) {
      localStorage.setItem("simulated_role", role);
    }
  }

  toggleRole() {
    this.setRole(this.role === "buyer" ? "vendor" : "buyer");
  }

  get isVendor() {
    return this.role === "vendor";
  }

  get isBuyer() {
    return this.role === "buyer";
  }
}

export const auth = new AuthState();
