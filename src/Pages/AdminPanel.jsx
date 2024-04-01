import React, { useState, useEffect } from 'react';
import Ticket from '../components/Ticket';
import { handleInputChange, handleResponseSubmit, handleTicketClick } from '../utils/useTicketHandlers';
import fetchTotalTicketsCount from '../utils/fetchTotalTicketsCount';
import { useAuth } from '../ContextLayers/AuthContext';
import { fetchTickets } from '../utils/fetchAllTickets';

function AdminPanel() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [ticketResponses, setTicketResponses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const {user} = useAuth()
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const totalCount = await fetchTotalTicketsCount(user, true);
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
            const allTicekts = await fetchTickets(currentPage, itemsPerPage);
            setTickets(allTicekts)
        }
        fetchData();
    }, [currentPage]);

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
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    className="ml-2"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;
