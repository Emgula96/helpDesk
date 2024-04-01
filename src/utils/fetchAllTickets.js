import { supabase } from '../supabase/supabaseClient';

export async function fetchTickets(currentPage, itemsPerPage) {
    const offset = (currentPage - 1) * itemsPerPage;
    const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + itemsPerPage - 1);
    if (error) {
        console.error('Error fetching tickets:', error.message);
        return [];
    } else {
        return data;
    }
}
