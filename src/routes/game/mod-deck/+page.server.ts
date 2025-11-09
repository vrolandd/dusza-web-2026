import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const session = await safeGetSession();
    
    if (!session) {
        throw error(401, 'Unauthorized');
    }

    const { data: playerCards, error: cardsError } = await supabase
        .from('player_cards')
        .select('*')
        .eq('player_id', session.user?.id || "");

    const { data: playerDecks, error: decksError } = await supabase
        .from('player_decks')
        .select('*')
        .eq('player_id', session.user?.id || "");

    const { data: playerDeckCards, error: deckCardsError } = await supabase
        .from('player_deck_cards')
        .select('*');

    if (cardsError || decksError || deckCardsError) {
        throw error(500, 'Adatbázis hiba');
    }

    return {
        playerCards,
        playerDecks,
        playerDeckCards
    };
};

export const actions = {
    create: async ({ request, locals: { supabase, safeGetSession } }) => {
        const session = await safeGetSession();
        
        if (!session) {
            throw error(401, 'Jogosulatlan hozzáférés');
        }

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const cardIds = formData.getAll('cardIds') as string[];

        if (!name) {
            throw error(400, 'A pakli nevének megadása kötelező');
        }

        const { data: deck, error: createError } = await supabase
            .from('player_decks')
            .insert({
                player_id: session.user?.id,
                name: name
            })
            .select()
            .single();

        if (createError) {
            throw error(500, 'A pakli létrehozása sikertelen');
        }

        // Add cards to the deck if provided
        if (cardIds.length > 0) {
            const deckCards = cardIds.map((cardId, index) => ({
                deck_id: deck.id,
                player_card_id: cardId,
                position: index
            }));

            const { error: cardsError } = await supabase
                .from('player_deck_cards')
                .insert(deckCards);

            if (cardsError) {
                throw error(500, 'A kártyák hozzáadása a paklihoz sikertelen');
            }
        }

        return { success: true, deck };
    }
};