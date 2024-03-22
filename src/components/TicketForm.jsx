import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

function TicketForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await supabase.from('tickets').insert([{ name, email, description }]);
            alert('Ticket submitted successfully!');
            setName('');
            setEmail('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting ticket:', error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Submit a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border border-gray-300 rounded-md p-2 w-full" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-300 rounded-md p-2 w-full" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border border-gray-300 rounded-md p-2 w-full h-32" required></textarea>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit Ticket</button>
            </form>
        </div>
    );
}

export default TicketForm;
