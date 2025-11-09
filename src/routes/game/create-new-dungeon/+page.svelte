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
    let selectedLeaderCardId: string = "";
    let availableCards: Card[] = [];
    let errors: { [key: string]: string } = {};
    let isLoading = false;
    let isCheckingName = false;

    const dungeonTypes = [
        // Rules: exact number of dungeon cards required per type
        { value: "simple", label: "Egyszerű találkozás", requiredCards: 1, requireLeader: false },
        { value: "small", label: "Kis kazamata", requiredCards: 3, requireLeader: true },
        { value: "large", label: "Nagy kazamata", requiredCards: 5, requireLeader: true }
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

    // Check if dungeon name exists
    async function checkDungeonName(name: string) {
        if (!name) return;
        
        isCheckingName = true;
        const { data, error } = await supabase
            .from('dungeons')
            .select('name')
            .eq('name', name)
            .maybeSingle();

        if (error) {
            console.error('Error checking dungeon name:', error);
            return;
        }

        if (data) {
            errors.name = "Már létezik ilyen nevű kazamata";
        }
        isCheckingName = false;
    }

    // Debounce function to prevent too many database calls
    function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: Parameters<T>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    const debouncedCheckName = debounce(checkDungeonName, 300);

    // Watch for name changes
    $: if (dungeonName) {
        debouncedCheckName(dungeonName);
    }

    $: {
        // Validate inputs whenever they change
        errors = { ...errors }; // Keep existing name error if present
        if (!dungeonName) {
            errors.name = "A kazamata nevét kötelező megadni";
        }
        if (!selectedType) {
            errors.type = "Válassz egy kazamata típust";
        }
        
        const selectedTypeConfig = dungeonTypes.find(t => t.value === selectedType);
        if (selectedTypeConfig) {
            // Exact number required
            if (selectedDungeonCards.length !== selectedTypeConfig.requiredCards) {
                errors.dungeonCards = `Pontosan ${selectedTypeConfig.requiredCards} kazamata kártyát kell választanod`;
            } else {
                delete errors.dungeonCards;
            }

            if (selectedTypeConfig.requireLeader) {
                if (!selectedLeaderCardId) {
                    errors.leader = "Válassz egy vezérkártyát (kötelező a kis és nagy kazamatához)";
                } else {
                    delete errors.leader;
                }
                // Disallow leader being present among dungeon cards
                if (selectedLeaderCardId && selectedDungeonCards.some(c => c.id === selectedLeaderCardId)) {
                    errors.leader = "A vezérkártya nem lehet egyszerre a kazamata listában is";
                }
            } else {
                delete errors.leader;
                selectedLeaderCardId = ""; // ensure leader cleared for simple dungeons
            }
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
            if (!typeConfig) {
                errors.dungeonCards = `Előbb válassz kazamata típust`;
                return;
            }
            // Prevent adding leader card into dungeon list
            if (selectedLeaderCardId && card.id === selectedLeaderCardId) {
                errors.dungeonCards = `A vezérkártyát nem adhatod hozzá a kazamata kártyákhoz`;
                return;
            }
            if (selectedDungeonCards.length >= typeConfig.requiredCards) {
                errors.dungeonCards = `Pontosan ${typeConfig.requiredCards} kazamata kártyát kell választanod`;
                return;
            }
            selectedDungeonCards = [...selectedDungeonCards, card];
        } else {
            selectedWorldCards = [...selectedWorldCards, card];
        }
    }

    // Called when the leader select changes: set leader and remove it from dungeon cards if present
    function handleLeaderSelect(event: Event) {
        const val = (event.target as HTMLSelectElement).value;
        selectedLeaderCardId = val;
        if (selectedLeaderCardId) {
            selectedDungeonCards = selectedDungeonCards.filter(c => c.id !== selectedLeaderCardId);
        }
    }

    function handleDragStart(event: DragEvent, card: Card) {
        event.dataTransfer?.setData('text/plain', card.id);
    }

    async function handleSubmit() {
        if (Object.keys(errors).length > 0 || isLoading || isCheckingName) return;

        isLoading = true;
        try {
            // Final check for existing dungeon name
            const { data: existingDungeon } = await supabase
                .from('dungeons')
                .select('name')
                .eq('name', dungeonName)
                .maybeSingle();

            if (existingDungeon) {
                errors.name = "Már létezik ilyen nevű kazamata";
                return;
            }

            const { data, error } = await supabase
                .from('dungeons')
                .insert([{
                    name: dungeonName,
                    type: selectedType,
                    dungeon_cards: selectedDungeonCards.map(c => c.id),
                    world_cards: selectedWorldCards.map(c => c.id),
                    leader_card: selectedLeaderCardId || null
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
                            <Field.Label>
                                Kazamata neve
                                {#if isCheckingName}
                                    <span class="ml-2 inline-block animate-spin">⟳</span>
                                {/if}
                            </Field.Label>
                            <Input 
                                type="text" 
                                placeholder="Sötét barlang" 
                                bind:value={dungeonName}
                                class={errors.name ? "border-destructive" : ""}
                            />
                            {#if errors.name}
                                <Field.Error>{errors.name}</Field.Error>
                            {/if}
                        </Field.Field>
                    </Field.Group>                <Field.Group>
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
                                        Húzd ide kazamata kártyákat...
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

                
                <Field.Group>
                    <Field.Field>
                        <Field.Label>Vezérkártya</Field.Label>
                        {#if selectedType === 'small' || selectedType === 'large'}
                            <select
                                class="w-full rounded-md border p-2 bg-transparent"
                                value={selectedLeaderCardId}
                                on:change={handleLeaderSelect}
                            >
                                <option value="">Válassz vezérkártyát...</option>
                                {#each availableCards as card}
                                    <option value={card.id}>{card.name}</option>
                                {/each}
                            </select>
                            <!-- Dropdown shows only card names; selected name display removed to rely on the select value -->
                            {#if errors.leader}
                                <Field.Error>{errors.leader}</Field.Error>
                            {/if}
                        {/if}
                    </Field.Field>
                </Field.Group>

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