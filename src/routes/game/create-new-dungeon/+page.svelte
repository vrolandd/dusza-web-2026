<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select";
    import * as Field from "$lib/components/ui/field";
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import { supabase } from '$lib/supabaseClient';
    
    interface Card {
        id: string;
        name: string;
        type: string;
        damage?: number;
        health?: number;
        image?: string;
    }

    let dungeonName = "";
    let selectedType = "";
    let selectedDungeonCards: Card[] = [];
    let selectedWorldCards: Card[] = [];
    let availableCards: Card[] = [];
    let errors: { [key: string]: string } = {};
    let isLoading = false;

    const dungeonTypes = [
        { value: "simple", label: "Egyszerű találkozás", minCards: 1, maxCards: 3 },
        { value: "small", label: "Kis kazamata", minCards: 3, maxCards: 5 },
        { value: "large", label: "Nagy kazamata", minCards: 5, maxCards: 10 }
    ];

    // Load available cards from Supabase
    async function loadCards() {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .order('name');
            
        if (error) {
            console.error('Error loading cards:', error);
            return;
        }
        
        availableCards = data;
    }

    $: {
        // Validate inputs whenever they change
        errors = {};
        if (dungeonName.length < 3) {
            errors.name = "A kazamata neve legalább 3 karakter hosszú kell legyen";
        }
        if (!selectedType) {
            errors.type = "Válassz egy kazamata típust";
        }
        
        const selectedTypeConfig = dungeonTypes.find(t => t.value === selectedType);
        if (selectedTypeConfig && selectedDungeonCards.length < selectedTypeConfig.minCards) {
            errors.dungeonCards = `Legalább ${selectedTypeConfig.minCards} kazamata kártyát kell választanod`;
        }
    }

    function handleCardDrop(event: DragEvent, targetList: 'dungeon' | 'world') {
        event.preventDefault();
        const cardId = event.dataTransfer?.getData('text/plain');
        if (!cardId) return;

        const card = availableCards.find(c => c.id === cardId);
        if (!card) return;

        if (targetList === 'dungeon') {
            const typeConfig = dungeonTypes.find(t => t.value === selectedType);
            if (typeConfig && selectedDungeonCards.length >= typeConfig.maxCards) {
                errors.dungeonCards = `Maximum ${typeConfig.maxCards} kazamata kártyát választhatsz`;
                return;
            }
            selectedDungeonCards = [...selectedDungeonCards, card];
        } else {
            selectedWorldCards = [...selectedWorldCards, card];
        }
    }

    function handleDragStart(event: DragEvent, card: Card) {
        event.dataTransfer?.setData('text/plain', card.id);
    }

    async function handleSubmit() {
        if (Object.keys(errors).length > 0 || isLoading) return;

        isLoading = true;
        try {
            const { data, error } = await supabase
                .from('dungeons')
                .insert([{
                    name: dungeonName,
                    type: selectedType,
                    dungeon_cards: selectedDungeonCards.map(c => c.id),
                    world_cards: selectedWorldCards.map(c => c.id)
                }])
                .select()
                .single();

            if (error) throw error;

            // Redirect to success page or show success message
            window.location.href = '/game/game-master';
        } catch (error) {
            console.error('Error creating dungeon:', error);
            errors.submit = "Hiba történt a kazamata létrehozása közben";
        } finally {
            isLoading = false;
        }
    }

    // Load cards when component mounts
    loadCards();
</script>

<div class="flex h-full flex-col gap-8 p-4">
    <h1 class="text-center text-4xl">Játékmester - Új kazamata létrehozása</h1>

    <Card class="w-full">
        <CardContent class="flex flex-col gap-8 p-6">
            <form class="flex flex-col gap-8" on:submit|preventDefault={handleSubmit}>
                <Field.Group>
                    <Field.Field>
                        <Field.Label>Kazamata neve</Field.Label>
                        <Input 
                            type="text" 
                            placeholder="Sötét barlang" 
                            bind:value={dungeonName}
                        />
                        {#if errors.name}
                            <Field.Error>{errors.name}</Field.Error>
                        {/if}
                    </Field.Field>
                </Field.Group>

                <Field.Group>
                    <Field.Field>
                        <Field.Label>Kazamata típusa</Field.Label>
                        <Select.Root 
                            type="single"
                            value={selectedType}
                            onValueChange={(value: string) => selectedType = value}
                        >
                            <Select.Trigger class="w-full">
                                {selectedType ? dungeonTypes.find(t => t.value === selectedType)?.label : "Válassz típust..."}
                            </Select.Trigger>
                            <Select.Content>
                                {#each dungeonTypes as type}
                                    <Select.Item value={type.value}>
                                        {type.label}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                        {#if errors.type}
                            <Field.Error>{errors.type}</Field.Error>
                        {/if}
                    </Field.Field>
                </Field.Group>

                <div class="grid grid-cols-2 gap-8">
                    <Field.Group>
                        <Field.Field>
                            <Field.Label>Választható kártyák</Field.Label>
                            <div class="flex h-[360px] w-full flex-wrap gap-4 rounded-md border border-white p-4 overflow-y-auto">
                                {#each availableCards as card}
                                    <div
                                        class="flex items-center justify-center p-4 border border-white rounded-md cursor-move hover:bg-accent"
                                        draggable="true"
                                        role="listitem"
                                        aria-label={`Kártya: ${card.name}`}
                                        on:dragstart={e => handleDragStart(e, card)}
                                    >
                                        {card.name}
                                    </div>
                                {/each}
                            </div>
                        </Field.Field>
                    </Field.Group>

                    <Field.Group>
                        <Field.Field>
                            <Field.Label>Kazamata kártyák</Field.Label>
                            <div 
                                class="flex h-[360px] w-full flex-wrap gap-4 rounded-md border border-white p-4 overflow-y-auto"
                                role="list"
                                aria-label="Kiválasztott kazamata kártyák"
                                on:dragover|preventDefault
                                on:drop={e => handleCardDrop(e, 'dungeon')}
                            >
                                {#if selectedDungeonCards.length === 0}
                                    <div class="flex h-full w-full items-center justify-center text-muted-foreground">
                                        Húzz ide kazamata kártyákat...
                                    </div>
                                {:else}
                                    {#each selectedDungeonCards as card}
                                        <div class="flex items-center justify-between p-4 border border-white rounded-md w-full">
                                            <span>{card.name}</span>
                                            <button
                                                type="button"
                                                class="text-destructive hover:text-destructive/80"
                                                on:click={() => selectedDungeonCards = selectedDungeonCards.filter(c => c.id !== card.id)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                            {#if errors.dungeonCards}
                                <Field.Error>{errors.dungeonCards}</Field.Error>
                            {/if}
                        </Field.Field>
                    </Field.Group>
                </div>

                {#if errors.submit}
                    <div class="text-destructive text-sm">{errors.submit}</div>
                {/if}

                <Button type="submit" class="w-full" disabled={isLoading || Object.keys(errors).length > 0}>
                    {isLoading ? 'Létrehozás folyamatban...' : 'Kazamata létrehozása'}
                </Button>
            </form>
        </CardContent>
    </Card>
</div>