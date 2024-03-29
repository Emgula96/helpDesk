import React, { useState } from 'react';
import TicketDetails from './TicketDetails';
import { useAuth } from '../ContextLayers/AuthContext';
import { StatusBadge } from './StatusBadge';
import { handleChangeStatus } from '../utils/useTicketHandlers';

const Ticket = ({ ticket, tickets, selectedTicket, setSelectedTicket, ticketResponses, responseText, handleTicketClick, handleInputChange, handleResponseSubmit, setResponseText, setTicketResponses, setTickets }) => {
    const { user, isAdmin } = useAuth();
    const [newStatus, setNewStatus] = useState('')
    return (
        <div key={ticket.id} className="mb-4 border border-gray-300 p-4 rounded-lg">
            <div className="flex justify-between items-center">
                {isAdmin ? (
                    <p>User: <span className="font-bold">{ticket.email}</span></p>
                ) : (
                    <React.Fragment>
                        <h2 className="text-lg font-semibold">{ticket.description}</h2>
                    </React.Fragment>
                )}
                <StatusBadge status={ticket.status} />
            </div>
            <div className="mt-2">
                <p className="text-sm">Responses: {ticket.response_count > 0 ? ticket.response_count : 0}</p>
            </div>
            {selectedTicket && selectedTicket.id === ticket.id && (
                <TicketDetails
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    handleChangeStatus={()=>handleChangeStatus(selectedTicket, newStatus, setSelectedTicket, setTickets )}
                    selectedTicket={selectedTicket}
                    ticketResponses={ticketResponses}
                    responseText={responseText}
                    handleResponseSubmit={() => handleResponseSubmit(selectedTicket, responseText, setResponseText, tickets, setTickets, setTicketResponses, user)}
                    handleInputChange={(e)=>handleInputChange(e, setResponseText)}
                />
            )}
            <button
                className="mt-2 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 w-full md:w-auto text-sm"
                onClick={() => handleTicketClick(ticket, selectedTicket, setSelectedTicket, setTicketResponses, isAdmin, setNewStatus)}
            >
                {selectedTicket && selectedTicket.id === ticket.id ? 'Hide Details' : 'View Details'}
            </button>
        </div>
    );
};

export default Ticket;
