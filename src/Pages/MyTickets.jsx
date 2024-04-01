import React, { useState, useEffect } from 'react';
import { useAuth } from '../ContextLayers/AuthContext';
import Ticket from '../components/Ticket';
import { handleInputChange, handleResponseSubmit, handleTicketClick } from '../utils/useTicketHandlers';
import fetchTotalTicketsCount from '../utils/fetchTotalTicketsCount';
import { fetchMyTickets } from '../utils/fetchMytickets';
import PaginationNav from '../components/PaginationNav';


function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [ticketResponses, setTicketResponses] = useState([]);
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5

    useEffect(() => {
        async function fetchData() {
            const totalCount = await fetchTotalTicketsCount(user, false)
            setTotalPages(Math.ceil(totalCount / itemsPerPage))
            const ticketData = await fetchMyTickets(user, currentPage, itemsPerPage);
            setTickets(ticketData)
        }
        fetchData();
    }, [user, currentPage]);

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
            <PaginationNav currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default MyTickets;
