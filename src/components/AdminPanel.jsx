import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../ContextLayers/AuthContext';
import { getStatusColor } from '../utils/getStatusColor';

function AdminPanel() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [responseText, setResponseText] = useState('');
    const [ticketResponses, setTicketResponses] = useState([]);
    const { user } = useAuth()
    
    useEffect(() => {
        async function fetchTickets() {
            const { data, error } = await supabase.from('tickets').select('*');
            if (error) {
                console.error('Error fetching tickets:', error.message);
            } else {
                setTickets(data);
            }
        }
            
        fetchTickets();
    }, []);

    const handleTicketClick = async (ticket) => {
        if (selectedTicket && selectedTicket.id === ticket.id) {
            setSelectedTicket(null); 
            setNewStatus(''); 
        } else {
            setSelectedTicket(ticket);
            setNewStatus(''); 
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
    };

    const handleChangeStatus = async () => {
        if (!selectedTicket || !newStatus) return;

        try {
            const { data, error } = await supabase
                .from('tickets')
                .update({ status: newStatus })
                .eq('id', selectedTicket.id);

            if (error) {
                console.error('Error updating ticket:', error.message);
            } else {
                console.log('Status updated successfully!');
                setTickets(prevTickets =>
                    prevTickets?.map(ticket =>
                        ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket
                    )
                );
            }
        } catch (error) {
            console.error('Error updating ticket:', error.message);
        }
        setSelectedTicket(null);
    };

    const handleResponseSubmit = async () => {
        if (!selectedTicket || !responseText) return;

        try {
            const { data, error } = await supabase
                .from('responses')
                .insert([{ ticket_id: selectedTicket.id, message: responseText, name: user.email }]);

            if (error) {
                console.error('Error adding response:', error.message);
            } else {
                console.log('Response added successfully!');
                await supabase
                    .from('tickets')
                    .update({ response_count: supabase.sql('response_count + 1') })
                    .eq('id', selectedTicket.id);
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
        setSelectedTicket(null)
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Ticket ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Responses</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets?.map(ticket => (
                        <tr key={ticket.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleTicketClick(ticket)}>
                            <td className="border px-4 py-2">{ticket.id}</td>
                            <td className="border px-4 py-2">{ticket.email}</td>
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
                    <p><strong>Ticket ID:</strong> {selectedTicket.id}</p>
                    <p><strong>Email:</strong> {selectedTicket.email}</p>
                    <p><strong>Description:</strong> {selectedTicket.description}</p>

                    <label className="block mt-4"><strong>New Status:</strong></label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border border-gray-300 rounded-md p-2">
                        <option value="">Select Status</option>
                        <option className='text-red-500' value="New">New</option>
                        <option className='text-yellow-500' value="In Progress">In Progress</option>
                        <option className='text-green-500' value="Resolved" >Resolved</option>
                    </select>
                    <button onClick={handleChangeStatus} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Status</button>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Responses</h3>
                        <ul>
                            {ticketResponses?.map((response, index) => (
                                <li key={index}>
                                    <p><strong>Name:</strong> {response.name}</p>
                                    <p><strong>Message:</strong> {response.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <input 
                            type="text" 
                            value={responseText} 
                            onChange={(e) => setResponseText(e.target.value)} 
                            placeholder="Enter response" 
                            className="border border-gray-300 rounded-md p-2 mr-2" 
                        />
                        <button onClick={handleResponseSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;

