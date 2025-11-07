<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card";
</script>

<h1 class="text-4xl pt-5 text-center">Játékmester - Új játékkörnyezet létrehozása</h1>
<div class="flex flex-col items-center pt-25 h-dvh">
    
    <Card class="pt-12 pb-12 max-w-xl w-full flex flex-col justify-center items-center gap-8">
        <div class="flex flex-row justify-between max-w-xl w-full pl-10 pr-10">
            <div class="flex flex-col gap-5">
                <Button>Új sima kártya létrehozása</Button>
                <Button>Új vezér kártya létrehozása</Button>
                <Button>Új kazamata létrehozása</Button>
            </div>
            <div class="flex flex-col gap-5 justify-center">
                <Button>Meglévő kártyák</Button>
                <Button>Játékkörnyezet elnevezése</Button>
            </div>
        </div>
        
    </Card>
</div>