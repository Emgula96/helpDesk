import { supabase } from '../supabase/supabaseClient';

export const handleInputChange = (e, setResponseText) => {
    setResponseText(e.target.value);
};

export const handleTicketClick = async (ticket, selectedTicket, setSelectedTicket, setTicketResponses, isAdmin, setNewStatus) => {
    if (selectedTicket && selectedTicket.id === ticket.id) {
        setSelectedTicket(null);
        if (isAdmin) {
            setNewStatus('')
        }
    } else {
        setSelectedTicket(ticket);
        if (isAdmin) {
            setNewStatus('')
        }
        try {
            const { data, error } = await supabase
                .from('responses')
                .select('name, message')
                .eq('ticket_id', ticket.id);
            if (error) {
                console.error('Error fetching responses:', error.message);
            } else {
                setTicketResponses(data);
            }
        } catch (error) {
            console.error('Error fetching responses:', error.message);
        }
    }
};

export const handleResponseSubmit = async (selectedTicket, responseText, setResponseText, tickets, setTickets, setTicketResponses, user) => {
    if (!selectedTicket || !responseText) return;

    try {
        const { data, error } = await supabase
            .from('responses')
            .insert([{ ticket_id: selectedTicket.id, message: responseText, name: user.email }]);
        if (error) {
            console.error('Error adding response:', error.message);
        } else {
            console.log('Response added successfully!');
            const updatedTickets = tickets?.map(ticket =>
                ticket.id === selectedTicket.id ? { ...ticket, response_count: (ticket.response_count || 0) + 1 } : ticket
            );
            setTickets(updatedTickets);
            const { data: responseData, error: responseError } = await supabase
                .from('responses')
                .select('name, message')
                .eq('ticket_id', selectedTicket.id);
            if (responseError) {
                console.error('Error fetching responses:', responseError.message);
            } else {
                setTicketResponses(responseData);
            }
        }
    } catch (error) {
        console.error('Error adding response:', error.message);
    }
    setResponseText('');
};


export const handleChangeStatus = async (selectedTicket, newStatus, setSelectedTicket, setTickets ) => {
        try {
            const { data, error } = await supabase
                .from('tickets')
                .update({ status: newStatus })
                .eq('id', selectedTicket.id)

            if (error) {
                console.error('Error updating ticket:', error.message)
            } else {
                console.log('Status updated successfully!')
                setTickets(prevTickets =>
                    prevTickets?.map(ticket =>
                        ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket
                    )
                )
            }
        } catch (error) {
            console.error('Error updating ticket:', error.message)
        }
        setSelectedTicket(null)
    }