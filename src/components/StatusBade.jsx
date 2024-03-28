import React from 'react';
import { getStatusColor } from '../utils/getStatusColor';

const StatusBadge = ({ status }) => {
    return (
        <span className={`text-sm ${getStatusColor(status)}`}>{status}</span>
    );
};

export default StatusBadge;
