import React from 'react';

function PaginationsCinema(data, itemsPerPage, onPageChange) {
    const [currentPage, setCurrentPage] = useState(1);
    
      useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        onPageChange(data.slice(startIndex, endIndex));
      }, [currentPage, data, itemsPerPage, onPageChange]);
    
      const totalPages = Math.ceil(data.length / itemsPerPage);
    
      const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            
        </div>
    );
}

export default PaginationsCinema;