import React from 'react';
import StatusBadge from './StatusBade';
import TicketDetails from './TicketDetails'
import { useAuth } from '../ContextLayers/AuthContext';

const Ticket = ({ ticket, tickets, selectedTicket, setSelectedTicket, ticketResponses, responseText, handleTicketClick, handleInputChange, handleResponseSubmit, setResponseText, setTicketResponses, setTickets }) => {
        const { user } = useAuth();

    return (
        <div key={ticket.id} className="mb-4 border border-gray-300 p-4 rounded-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{ticket.description}</h2>
                <StatusBadge status={ticket.status} />
            </div>
            <div className="mt-2">
                <p className="text-sm">Responses: {ticket.response_count > 0 ? ticket.response_count : 0}</p>
            </div>
            {selectedTicket && selectedTicket.id === ticket.id && (
                    <TicketDetails
                                selectedTicket={selectedTicket}
                                ticketResponses={ticketResponses}
                                responseText={responseText}
                                handleResponseSubmit={() => handleResponseSubmit(selectedTicket, responseText, setResponseText, tickets, setTickets, setTicketResponses, user)}
                                handleInputChange={(e)=>handleInputChange(e, setResponseText)}
                            />
                        )}
                        <button
                            className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 w-full md:w-auto"
                            onClick={() => handleTicketClick(ticket, selectedTicket, setSelectedTicket, setTicketResponses)}
                            >View Details</button>
                    </div>
    );
};

export default Ticket;
