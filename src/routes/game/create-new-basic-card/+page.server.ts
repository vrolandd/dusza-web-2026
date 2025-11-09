import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        
        // Extract form data
        const cardData = {
            name: formData.get('title') as string,
            attack: parseInt(formData.get('damage') as string) || 0,
            hp: parseInt(formData.get('hp') as string) || 0,
            element: formData.get('type') as string,
            bucket_id: formData.get('bucket_id') as string,
        };

        try {
            const { data, error } = await locals.supabase
                .from('dungeon_cards')
                .insert([cardData])
                .select()
                .single();

            if (error) {
                console.error('Error creating card:', error);
                return {
                    success: false,
                    error: 'Hiba történt a kártya létrehozása során'
                };
            }

            return {
                success: true,
                data
            };
        } catch (err) {
            console.error('Unexpected error:', err);
            return {
                success: false,
                error: 'Váratlan hiba történt'
            };
        }
    }
};