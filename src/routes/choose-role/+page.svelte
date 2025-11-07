<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card";
</script>

<div class="flex flex-col items-center justify-center h-dvh">
    <Card class="pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
        <h1 class="text-2xl">Válassz szerepkört</h1>
        <div class="flex flex-row gap-2">
            <Button><a href="/player">Játékos</a></Button>
            <Button><a href="/game-master">Játékmester</a></Button>
        </div>
    </Card>
</div>