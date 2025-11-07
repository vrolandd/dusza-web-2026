<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card";
</script>

<div class="flex flex-col h-dvh">
    <div class="flex items-center justify-center pb-12">
        <h1>Kazamata neve:</h1>
    </div>


    <div class="flex-col flex items-center justify-center pb-12">
        <h1>Kazamata kártyái:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--kazamata cards-->
        </Card>
    </div>

    <div class="flex-col flex items-center justify-center pb-12">
        <h1>Játékos kártyái:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--player cards-->
        </Card>
    </div>

    <div class="flex flex-col items-center justify-center pt-12">
        <Button><a href="/upgrade">Tovább</a></Button>
    </div>
</div>