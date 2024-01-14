import React, { useState } from 'react';

const Pagination = (props) => {
    const { page, setPage, total } = props;
    const totalResults = total;
    const resultsPerPage = 12;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const handlePageChange = (newPage) => {
        // Ensure the newPage is within valid bounds
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white px-4 py-3 sm:px-6">
            {/* ... previous and next buttons for small screens */}
            <div class="flex flex-1 justify-between sm:hidden">
                <a href="#" onClick={() => handlePageChange(page - 1)} class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" onClick={() => handlePageChange(page + 1)} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 p-1">
                        Showing
                        <span className="font-medium p-1">{(page - 1) * resultsPerPage + 1}</span>
                        to
                        <span className="font-medium p-1">{Math.min(page * resultsPerPage, totalResults)}</span>
                        of
                        <span className="font-medium p-1">{totalResults}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm overflow-hidden" aria-label="Pagination">
                        <a
                            href="#"
                            onClick={() => handlePageChange(page - 1)}
                            className={`relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 text-gray-400 ${page === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                }`}
                        >
                            <span className="sr-only">Previous</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        {[...Array(totalPages).keys()].map((pageNum) => {
                            const currentPage = pageNum + 1;
                            const isCurrentPage = currentPage === page;

                            // Display only a limited number of page numbers around the current page
                            if (
                                (currentPage >= page - 2 && currentPage <= page + 2) ||
                                currentPage === 1 ||
                                currentPage === totalPages
                            ) {
                                return (
                                    <a
                                        key={currentPage}
                                        href="#"
                                        onClick={() => handlePageChange(currentPage)}
                                        className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${isCurrentPage
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                            }`}
                                    >
                                        {currentPage}
                                    </a>
                                );
                            } else if (
                                (currentPage === page - 3 && currentPage > 2) ||
                                (currentPage === page + 3 && currentPage < totalPages - 1)
                            ) {
                                // Display ellipsis (...) for skipped pages
                                return (
                                    <span key={`ellipsis-${currentPage}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>
                                );
                            }

                            return null;
                        })}
                        <a
                            href="#"
                            onClick={() => handlePageChange(page + 1)}
                            className={`relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-gray-400 ${page === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                }`}
                        >
                            <span className="sr-only">Next</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
