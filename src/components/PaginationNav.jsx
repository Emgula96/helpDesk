import React from 'react';

const PaginationNav = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="mt-4">
            <button
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="mr-2"
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                className="ml-2"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationNav;
