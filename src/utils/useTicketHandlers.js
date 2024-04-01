import { supabase } from '../supabase/supabaseClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                toast.error('Error fetching responses:', error.message);
            } else {
                setTicketResponses(data);
            }
        } catch (error) {
            toast.error('Error fetching responses:', error.message);
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
            toast.error('Error adding response:', error.message);
        } else {
            toast.success('Response Added');
            const updatedTickets = tickets?.map(ticket =>
                ticket.id === selectedTicket.id ? { ...ticket, response_count: (ticket.response_count || 0) + 1 } : ticket
            );
            setTickets(updatedTickets);
            const { data: responseData, error: responseError } = await supabase
                .from('responses')
                .select('name, message')
                .eq('ticket_id', selectedTicket.id);
            if (responseError) {
                toast.error('Error fetching responses:', responseError.message);
            } else {
                setTicketResponses(responseData);
            }
        }
    } catch (error) {
        toast.error('Error adding response:', error.message);
    }
    setResponseText('');
};


export const handleChangeStatus = async (selectedTicket, newStatus, setSelectedTicket, setTickets ) => {
    if (!newStatus) {
        toast.error('Please select a valid status');
        return;
    }
    try {
        const { data, error } = await supabase
            .from('tickets')
            .update({ status: newStatus })
            .eq('id', selectedTicket.id);
        if (error) {
            toast.error('Error updating ticket:', error.message)
        } else {
            toast.success('Ticket updated!');
            setTickets(prevTickets =>
                prevTickets?.map(ticket =>
                    ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket
                )
            )
        }
    } catch (error) {
        toast.error('Error updating ticket:', error.message)
    }
    setSelectedTicket(null)
}
