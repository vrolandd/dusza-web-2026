<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    let { children, data } = $props();

    async function signOut() {
        const { error } = await data.supabase.auth.signOut()
    }
</script>

<nav class="h-[75px] bg-accent flex items-center justify-end pr-6 sticky top-0">
    <Button onclick={signOut}>Kijelentkezés</Button>
</nav>

{@render children()}