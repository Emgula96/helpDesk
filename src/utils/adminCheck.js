import { useAuth } from '../ContextLayers/AuthContext';
import { supabase } from '../supabase/supabaseClient';

export async function checkAdmin() {
    const { user } = useAuth()

    if (!user) {
        return false
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .select('admin')
            .eq('email', user.email)
            .single()

        if (error) {
            console.error('Error fetching user data:', error.message)
            return false;
        }
        return data && data.admin === true;
    } catch (error) {
        console.error('Error checking admin status:', error.message)
        return false
    }
}
