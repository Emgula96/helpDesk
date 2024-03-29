import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../ContextLayers/AuthContext';
import { getStatusColor } from '../utils/getStatusColor';
import Ticket from '../components/Ticket';
import { handleInputChange } from '../utils/useTicketHandlers';

function AdminPanel() {
    const [tickets, setTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [newStatus, setNewStatus] = useState('')
    const [responseText, setResponseText] = useState('')
    const [ticketResponses, setTicketResponses] = useState([])
    const { user, isAdmin } = useAuth()
    
    useEffect(() => {
        async function fetchTickets() {
            const { data, error } = await supabase.from('tickets').select('*')
            if (error) {
                console.error('Error fetching tickets:', error.message)
            } else {
                setTickets(data)
            }
        }
            
        fetchTickets()
    }, [])

const handleTicketClick = async (ticket) => {
    if (selectedTicket && selectedTicket.id === ticket.id) {
        setSelectedTicket(null);
        setNewStatus('');
        setTicketResponses([]);
    } else {
        setSelectedTicket(ticket);
        setNewStatus('');
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

    const handleResponseSubmit = async () => {
    try {
        const { data, error } = await supabase
            .from('responses')
            .insert([{ ticket_id: selectedTicket.id, message: responseText, name: user.email }])

        if (error) {
            console.error('Error adding response:', error.message)
        } else {
            console.log('Response added successfully!')
            const updatedTickets = tickets.map(ticket =>
                ticket.id === selectedTicket.id ? { ...ticket, response_count: (ticket.response_count || 0) + 1 } : ticket
            )
            setTickets(updatedTickets)

            const { data: responseData, error: responseError } = await supabase
                .from('responses')
                .select('name, message')
                .eq('ticket_id', selectedTicket.id)
            if (responseError) {
                console.error('Error fetching responses:', responseError.message)
            } else {
                setTicketResponses(responseData) 
            }
        }
    } catch (error) {
        console.error('Error adding response:', error.message)
    }
    setResponseText('')
    setSelectedTicket(null)
}


return (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>

                {tickets?.map(ticket => (
                        <Ticket
                        key={ticket.id}
                        ticket={ticket}
                        tickets={tickets}
                        setTickets={setTickets}
                        selectedTicket={selectedTicket}
                        setSelectedTicket={setSelectedTicket}
                        ticketResponses={ticketResponses}
                        responseText={responseText}
                        handleTicketClick={handleTicketClick}
                        handleInputChange={handleInputChange}
                        handleResponseSubmit={handleResponseSubmit}
                        setTicketResponses={setTicketResponses}
                        setResponseText={setResponseText}
                    />
                ))}
    </div>
);
}

export default AdminPanel;

