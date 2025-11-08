<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card";
</script>

<div class="flex flex-col h-dvh justify-center">



    <div class="flex-col flex items-center justify-center pb-12">
        <h1>Gyűjtemény:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--collection cards-->
        </Card>
    </div>

        <div class="flex-col flex items-center justify-center pb-12">
        <h1>Új Pakli:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--deck-->
        </Card>
    </div>

    <div class="flex flex-col items-center justify-center pt-12">
        <Button><a href="/game/player">Tovább</a></Button>
    </div>
</div>