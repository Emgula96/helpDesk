import { supabase } from '../supabase/supabaseClient';

const fetchTotalTicketsCount = async (user, isAdmin) => {
    if (isAdmin) {
        const { data, error } = await supabase
            .from('tickets')
            .select('count', { count: 'exact' });
        if (error) {
            console.error('Error fetching total ticket count:', error.message);
            return 0;
        } else {
            return data.length > 0 ? data[0].count : 0;
        }
    } else {
        const { data, error } = await supabase
            .from('tickets')
            .select('count', { count: 'exact' })
            .eq('email', user.email);
        if (error) {
            console.error('Error fetching total ticket count:', error.message);
            return 0;
        } else {
            return data.length > 0 ? data[0].count : 0;
        }
    }
};

export default fetchTotalTicketsCount;
