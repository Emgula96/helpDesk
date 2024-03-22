import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../ContextLayers/AuthContext';
import { getStatusColor } from '../utils/getStatusColor';

function MyTickets() {
    const [tickets, setTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [responseText, setResponseText] = useState('')
    const [ticketResponses, setTicketResponses] = useState([])
    const { user } = useAuth()
    
    useEffect(() => {
        async function fetchTickets() {
            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .eq('email', user.email)
            if (error) {
                console.error('Error fetching tickets:', error.message)
            } else {
                setTickets(data)
            }
        }
            
        fetchTickets()
    }, [user])

    const handleTicketClick = async (ticket) => {
        setSelectedTicket(ticket)
        try {
            const { data, error } = await supabase
                .from('responses')
                .select('name, message')
                .eq('ticket_id', ticket.id)
            if (error) {
                console.error('Error fetching responses:', error.message)
            } else {
                setTicketResponses(data)
            }
        } catch (error) {
            console.error('Error fetching responses:', error.message)
        }
    }

    const handleResponseSubmit = async () => {
    if (!selectedTicket || !responseText) return

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
};

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">My Tickets</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Responses</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleTicketClick(ticket)}>
                            <td className="border px-4 py-2">{ticket.description}</td>
                            <td className={`border px-4 py-2 ${getStatusColor(ticket.status)}`}>{ticket.status}</td>
                            <td className="border px-4 py-2">{ticket.response_count > 0 ? ticket.response_count : 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

    {selectedTicket && (
    <div className="mt-8 border border-gray-300 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Ticket Details</h2>
        <p><strong>Description:</strong> {selectedTicket.description}</p>

        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Responses</h3>
            <ul>
                {ticketResponses.map((response, index) => (
                    <li key={index}>
                        <p ><span className='font-bold'>{response.name}</span> : {response.message}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div className="mt-4">
            <textarea
                rows={2}                
                type="textbox" 
                value={responseText} 
                onChange={(e) => setResponseText(e.target.value)} 
                placeholder="Enter your comment" 
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button onClick={handleResponseSubmit} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 justify-end">Submit</button>
        </div>
    </div>
    )}
        </div>
    );
}

export default MyTickets;
