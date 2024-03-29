import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../ContextLayers/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TicketForm() {
    const [description, setDescription] = useState('');
    const { userData } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = userData?.email;
        const userName = userData?.name;
        
        try {
            await supabase.from('tickets').insert([{ name: userName, email, description }]);
            toast.success('Ticket submitted successfully!');
            setDescription('');
        } catch (error) {
            console.error('Error submitting ticket:', error.message);
            toast.error('Error submitting ticket');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 px-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Submit a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                >
                    Submit Ticket
                </button>
            </form>
        </div>
    );
}

export default TicketForm;
