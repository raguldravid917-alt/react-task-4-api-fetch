function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ⬅ Prev
      </button>

      <div className="page-numbers">
        {pages.map((p) => (
          <button
            key={p}
            className={`page-number ${p === page ? "page-number-active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;
