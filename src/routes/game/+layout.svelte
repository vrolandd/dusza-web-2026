<script lang="ts">
    let { children } = $props();
</script>

<nav class="h-[50px] bg-accent ">
    <a href="/" class="text-xl font-bold">Kijelentkezés</a>
</nav>
    
{@render children()}