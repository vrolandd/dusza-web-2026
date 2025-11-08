<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card";
</script>

<h1 class="text-4xl pt-5 text-center">Játékmester - Új játékkörnyezet létrehozása</h1>
<div class="flex flex-col items-center pt-25 h-dvh">
    
    <Card class="pt-12 pb-12 max-w-xl w-full flex flex-col justify-center items-center gap-8">
        <div class="flex flex-row justify-between max-w-xl w-full pl-10 pr-10">
            <div class="flex flex-col gap-5">
                <Button><a href="/create-basic-card">Új sima kártya létrehozása</a></Button>
                <Button><a href="/create-leader-card">Új vezér kártya létrehozása</a></Button>
                <Button><a href="/create-arena">Új kazamata létrehozása</a></Button>
            </div>
            <div class="flex flex-col gap-5 justify-center">
                <Button><a href="/existing-cards">Meglévő kártyák</a></Button>
                <Button>Játékkörnyezet elnevezése</Button>
            </div>
        </div>
        
    </Card>
</div>