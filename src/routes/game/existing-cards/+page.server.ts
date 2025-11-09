import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const { data: cards, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching cards:', error);
        return {
            cards: [],
            error: 'Hiba történt a kártyák betöltése során'
        };
    }

    return {
        cards: cards || []
    };
};