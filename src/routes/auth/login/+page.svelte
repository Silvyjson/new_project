<!-- src/routes/auth/login/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { invalidateAll } from "$app/navigation";
  import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
  import AuthForm from "$lib/components/auth/AuthForm.svelte";
  import Input from "$lib/components/common/Input.svelte";
  import PasswordInput from "$lib/components/auth/PasswordInput.svelte";
  import Button from "$lib/components/common/Button.svelte";

  // Form state
  let email = "";
  let password = "";
  let rememberMe = false;
  let loading = false;
  let error = "";

  // Validation
  const validate = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return null;
  };

  // Submit handler
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    error = "";

    const validationError = validate();
    if (validationError) {
      error = validationError;
      return;
    }

    loading = true;

    try {
      // In real app: API call to login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      // Refresh auth state
      await invalidateAll();

      // Role-based redirect
      const userData = await response.json();
      if (userData.role === "vendor") {
        if (!userData.onboardingComplete) {
          goto("/auth/register/vendor/verify-id");
        } else {
          goto("/dashboard/overview");
        }
      } else {
        goto("/home");
      }
    } catch (err: any) {
      error = err.message || "An error occurred. Please try again.";
    } finally {
      loading = false;
    }
  };
</script>

<AuthLayout title="Welcome Back 👋" subtitle="Sign in to continue to VendorHub">
  <AuthForm {loading} {error}>
    <form on:submit={handleSubmit} class="space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        autocomplete="email"
        bind:value={email}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        required
        autocomplete="current-password"
        bind:value={password}
      />

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            class="w-4 h-4 text-primary rounded border-gray-300"
            bind:checked={rememberMe}
          />
          <span class="text-sm text-text-muted">Remember me</span>
        </label>
        <a
          href="/auth/forgot-password"
          class="text-sm text-primary hover:underline">Forgot password?</a
        >
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>

    <svelte:fragment slot="footer">
      <p class="text-center text-sm text-text-muted">
        Don't have an account?
        <a
          href="/auth/register"
          class="text-primary font-medium hover:underline">Register instead</a
        >
      </p>
    </svelte:fragment>
  </AuthForm>
</AuthLayout>
