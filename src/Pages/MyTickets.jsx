import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../ContextLayers/AuthContext';
import Ticket from '../components/Ticket';
import { handleInputChange, handleResponseSubmit, handleTicketClick } from '../utils/useTicketHandlers';

function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [ticketResponses, setTicketResponses] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        async function fetchTickets() {
            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .eq('email', user.email);
            if (error) {
                console.error('Error fetching tickets:', error.message);
            } else {
                setTickets(data);
            }
        }
            
        fetchTickets();
    }, [user]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">My Tickets</h1>
            <div className="grid lg:grid-cols-1">
                {tickets.map(ticket => (
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
        </div>
    );
}

export default MyTickets;
