import { useAuth } from "../ContextLayers/AuthContext";

const TicketDetails = ({ selectedTicket, ticketResponses, responseText, handleResponseSubmit, handleInputChange, newStatus, handleChangeStatus }) => {
  const {isAdmin} = useAuth()  
  console.log(isAdmin)
  return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
            <p><strong>Description:</strong> {selectedTicket.description}</p>
            {isAdmin && (
                <div>
                    <label className="block mt-4"><strong>New Status:</strong></label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border border-gray-300 rounded-md p-2">
                        <option value="">Select Status</option>
                        <option className='text-red-500' value="New">New</option>
                        <option className='text-yellow-500' value="In Progress">In Progress</option>
                        <option className='text-green-500' value="Resolved" >Resolved</option>
                    </select>
                    <button onClick={handleChangeStatus} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Status</button>
                </div>
            )}
            <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Responses</h4>
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
                    value={responseText} 
                    onChange={handleInputChange} 
                    placeholder="Enter your comment" 
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <button onClick={handleResponseSubmit} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full md:w-auto">Submit</button>
            </div>
        </div>
    );
};

export default TicketDetails;
