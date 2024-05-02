/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <nav aria-label="Page navigation" className="flex justify-center">
      <ul className="list-none flex">
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-orange-600 ${
              currentPage === 1 ? "pointer-events-none" : ""
            }`}
            href="#"
            aria-label="Previous"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <li
            key={pageNumber}
            aria-current={currentPage === pageNumber + 1 ? "page" : undefined}
          >
            <a
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-orange-600 focus:bg-orange-600 focus:text-orange-700 focus:outline-none active:bg-orange-600 active:text-orange-600 dark:text-orange dark:hover:bg-orange-600 dark:focus:bg-orange-600 dark:focus:text-orange-500 dark:active:bg-orange-600 dark:active:text-orange-500 ${
                currentPage === pageNumber + 1
                  ? "font-bold, text-orange-600"
                  : ""
              }`}
              href="#"
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-orange-600 ${
              currentPage === totalPages ? "pointer-events-none" : ""
            }`}
            href="#"
            aria-label="Next"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
