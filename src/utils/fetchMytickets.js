import { supabase } from '../supabase/supabaseClient';

const fetchMyTickets = async (user, currentPage, itemsPerPage) => {
    const offset = (currentPage - 1) * itemsPerPage;
    const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('email', user.email)
        .range(offset, offset + itemsPerPage - 1);
    if (error) {
        console.error('Error fetching tickets:', error.message);
        return [];
    } else {
        return data || [];
    }
};

export default fetchMyTickets;
