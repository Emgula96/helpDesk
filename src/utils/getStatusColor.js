    export const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return 'bg-red-500';
            case 'In Progress':
                return 'bg-yellow-500';
            case 'Resolved':
                return 'bg-green-500';
            default:
                return '';
        }
    };