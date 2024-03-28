export const getStatusColor = (status) => {
    switch (status) {
        case 'New':
            return 'bg-red-500 rounded text-white px-2 py-1'
        case 'In Progress':
            return 'bg-yellow-500 rounded text-white px-2 py-1'
        case 'Resolved':
            return 'bg-green-500 rounded text-white px-2 py-1'
        default:
            return 'rounded text-white px-2 py-1'
    }
};