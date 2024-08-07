import { supabase } from '../supabase/supabaseClient';

export async function fetchMyTickets(user, currentPage, itemsPerPage) {
    const offset = (currentPage - 1) * itemsPerPage;
    const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .range(offset, offset + itemsPerPage - 1);
    if (error) {
        console.error('Error fetching tickets:', error.message);
        return [];
    } else {
        return data;
    }
}
