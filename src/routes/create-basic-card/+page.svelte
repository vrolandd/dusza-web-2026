<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card";
</script>

<h1 class="text-4xl pt-5 text-center">Játékmester - Új sima kártya létrehozása</h1>

<div class="flex flex-col items-center pt-25 h-dvh">
    <Card class="pt-12 pb-12 max-w-xl w-full flex flex-col justify-center items-center">
        <div class="flex flex-col items-center">
            <label for="" class="text-lg">Kártya neve</label>
            <input type="text" name="card-name" id="card-name" class="text-center" placeholder="Name"/>
        </div>
        <div class="flex flex-row gap-5">
            <div class="flex flex-col items-center">
                <label for="" class="text-lg">Kártya sebzése</label>
                <input type="number" name="card-damage" id="card-damage" placeholder="Damage" min="1" max="100" class="w-full text-center">
            </div>
            <div class="flex flex-col items-center">
                <label for="" class="text-lg">Kártya életereje</label>
                <input type="number" name="card-health" id="card-health" placeholder="Health" min="2" max="100" class="w-full text-center">
            </div>
        </div>
        <div class="flex flex-col items-center">
            <label for="" class="text-lg">Kártya típusa</label>
            <input type="text" name="card-type" id="card-type" placeholder="Type" class="text-center">
        </div>
        <Button>Létrehozás</Button>
    </Card>
</div>