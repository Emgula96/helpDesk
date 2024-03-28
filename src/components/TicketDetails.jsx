const TicketDetails = ({ selectedTicket, ticketResponses, responseText, handleResponseSubmit, handleInputChange }) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
            <p><strong>Description:</strong> {selectedTicket.description}</p>
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
