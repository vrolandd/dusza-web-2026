import { supabase } from '$lib/supabaseClient';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const element = data.get('element') as string;
        const attack = parseInt(data.get('attack') as string);
        const hp = parseInt(data.get('hp') as string);
        const bucket_id = data.get('bucket_id') as string || null;
        const islead = data.get('islead') === 'true';

        if (!name || !element || isNaN(attack) || isNaN(hp)) {
            return fail(400, { error: 'Hiányzó vagy érvénytelen kötelező mezők' });
        }

        const { data: card, error } = await supabase
            .from('leader_cards')
            .insert({
                name,
                element,
                attack,
                hp,
                bucket_id,
                islead
            })
            .select()
            .single();

        if (error) {
            return fail(500, { error: `Adatbázis hiba: ${error.message}` });
        }

        return { success: true, card };
    }
};