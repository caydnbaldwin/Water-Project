interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange} : PaginationProps) => {
  return (
    <>
      <div className="flex item-center justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, numPage) => (
          <button
            key={numPage + 1}
            onClick={() => onPageChange(numPage + 1)}
            disabled={currentPage === numPage + 1}
          >
            {numPage + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(size) => {
            onPageSizeChange(Number(size.target.value));
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default Pagination;