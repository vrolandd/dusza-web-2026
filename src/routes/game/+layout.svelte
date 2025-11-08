<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    let { children, data } = $props();

    async function signOut() {
        const { error } = await data.supabase.auth.signOut()
    }
</script>


<nav class="h-[75px] bg-accent flex items-center justify-end pr-6 sticky top-0">
    <Button class="mr-5"><a href="/game/choose-role">Főmenü</a></Button>
    <Button onclick={signOut}><a href="/auth">Kijelentkezés</a></Button>
</nav>

<div class="flex justify-center h-[calc(100dvh-75px)] overflow-auto">
	<div class="flex flex-col items-center *:w-full *:max-w-7xl w-full *:py-8">
        {@render children()}
	</div>
</div>
