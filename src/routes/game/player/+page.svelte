<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card";
</script>

<div class="flex flex-col h-dvh justify-center">
    <div class="flex items-center justify-center pb-12">
        <Card class="pt-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <Button><a href="/game/create-deck">Pakli létrehozása</a></Button>
            <Button><a href="/game/arena">Kazamata kiválasztása</a></Button>
            <Button><a href="/game/mod-deck">Pakli módosítása</a></Button>
            <Button><a href="/game/new-deck">Új pakli létrehozása</a></Button>
            <Button><a href="/game/fight">Harc</a></Button>
        </Card>
    </div>


    <div class="flex-col flex items-center justify-center pb-12">
        <h1>Létrehozott pakli:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--created  deck-->
        </Card>
    </div>

        <div class="flex-col flex items-center justify-center pb-12">
        <h1>Választott kazamata:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--show chosen dungeon-->
        </Card>
    </div>

    <div class="flex flex-col items-center justify-center pt-12">
        <Button><a href="/game/fight">Harc</a></Button>
    </div>
</div>




