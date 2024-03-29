import React from 'react';
import { getStatusColor } from '../utils/getStatusColor';

export const StatusBadge = ({ status }) => {
    return (
        <span className={`text-sm ${getStatusColor(status)}`}>{status}</span>
    );
};


