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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); 
    useEffect(() => {
        fetchTickets();
    }, [user, currentPage]);

    const fetchTickets = async () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .eq('email', user.email)
            .range(offset, offset + itemsPerPage - 1);
        if (error) {
            console.error('Error fetching tickets:', error.message);
        } else {
            setTickets(data);
        }
    };

    const totalPages = Math.ceil(tickets.length/itemsPerPage);
    
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
            <div className="mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="mr-2"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1 )}
                    className="ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default MyTickets;
