import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;

        if (!name || !description) {
            return fail(400, { error: 'A név és a leírás megadása kötelező' });
        }

        const { data: dungeon, error } = await locals.supabase
            .from('dungeons')
            .insert([
                {
                    name,
                    description,
                    created_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) {
            return fail(500, { error: 'A kazamata létrehozása sikertelen' });
        }

        return { success: true, dungeon };
    }
};