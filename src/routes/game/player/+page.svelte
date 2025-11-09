<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    interface Dungeon {
        id: string;
        name: string;
        type: string;
        dungeon_cards: string[];
    }
    interface CardType {
        id: string;
        name: string;
        type: string;
        damage?: number;
        health?: number;
        image?: string;
    }

    let dungeons: Dungeon[] = [];
    let selectedDungeonId: string = "";
    let selectedDungeon: Dungeon | null = null;
    let dungeonCards: CardType[] = [];
    let allCards: CardType[] = [];
    let loading = true;

    onMount(async () => {
        // Dungeons lekérése
        const { data: dungeonsData } = await supabase.from('dungeons').select('*').order('name');
        dungeons = dungeonsData || [];
        // Kártyák lekérése
        const { data: cardsData } = await supabase.from('cards').select('*');
        allCards = cardsData || [];
        loading = false;
    });

    $: selectedDungeon = dungeons.find(d => d.id === selectedDungeonId) || null;
    $: dungeonCards = selectedDungeon ? allCards.filter(c => selectedDungeon.dungeon_cards?.includes(c.id)) : [];
</script>

<div class="flex flex-col justify-center">
    <div class="flex items-center justify-center pb-12">
        <Card class="pt-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <Button href="/game/create-deck">Pakli létrehozása</Button>
            <Button href="/game/mod-deck">Pakli módosítása</Button>
            <Button href="/game/new-deck">Új pakli létrehozása</Button>
            <Button href="/game/fight">Harc</Button>
        </Card>
    </div>


    <div class="flex-col flex items-center justify-center pb-12">
        <h1>Létrehozott pakli:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            <!--created  deck-->
        </Card>
    </div>

        <div class="flex-col flex items-center justify-center pb-12">
        <h1>Válassz kazamatát:</h1>
        <Card class="h-full pt-12 pb-12 max-w-lg w-full flex flex-col justify-center items-center gap-8">
            {#if loading}
                <span>Töltés...</span>
            {:else}
                <Select.Root type="single" value={selectedDungeonId} onValueChange={(v: string) => selectedDungeonId = v}>
                    <Select.Trigger class="w-full">
                        {selectedDungeon ? selectedDungeon.name : "Válassz kazamatát..."}
                    </Select.Trigger>
                    <Select.Content>
                        {#each dungeons as dungeon}
                            <Select.Item value={dungeon.id}>{dungeon.name}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
                {#if selectedDungeon}
                    <div class="mt-4 text-sm text-muted-foreground">Típus: {selectedDungeon.type}</div>
                {/if}
            {/if}
        </Card>
    </div>


    <div class="flex flex-col items-center justify-center pb-12">
        <h2>Kazamata kártyái:</h2>
        <Card class="h-full pt-6 pb-6 max-w-lg w-full flex flex-col justify-center items-center gap-4">
            {#if selectedDungeon}
                {#if dungeonCards.length === 0}
                    <span class="text-muted-foreground">Nincs kártya ehhez a kazamatához.</span>
                {:else}
                    <ul class="w-full flex flex-col gap-2">
                        {#each dungeonCards as card}
                            <li class="border rounded p-2 flex flex-row items-center gap-2">
                                <span class="font-semibold">{card.name}</span>
                                {#if card.damage}
                                    <span class="text-xs">Sebzés: {card.damage}</span>
                                {/if}
                                {#if card.health}
                                    <span class="text-xs">Élet: {card.health}</span>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            {:else}
                <span class="text-muted-foreground">Előbb válassz kazamatát!</span>
            {/if}
        </Card>
    </div>

    <div class="flex flex-col items-center justify-center pt-12">
        <Button href="/game/fight">Harc</Button>
    </div>
</div>




