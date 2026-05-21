import { useMemo } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const currentPage = Number(page) || 1;
  const totalPages = Number(pageCount) || 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages ||
      pageNumber === currentPage
    ) {
      return;
    }

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  if (totalPages < 2) return null;

  return (
    <div className="mt-20 flex justify-center">
      <div className="flex items-center gap-2 rounded-2xl border border-base-300 bg-base-100 px-3 py-3 shadow-xl">
        <button
          type="button"
          disabled={isFirstPage}
          className="btn btn-sm rounded-xl border-none bg-base-200 px-5 font-semibold tracking-wide text-base-content transition-all duration-300 hover:-translate-x-1 hover:bg-primary hover:text-primary-content disabled:pointer-events-none disabled:opacity-30 sm:btn-md"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ← Prev
        </button>

        <div className="flex items-center gap-1 rounded-xl bg-base-200/70 p-1">
          {pages.map((pageNumber, index) => {
            if (pageNumber === "...") {
              return (
                <button
                  key={`ellipsis-${index}`}
                  type="button"
                  disabled
                  className="btn btn-sm border-none bg-transparent px-3 text-base-content/40 shadow-none sm:btn-md"
                >
                  ...
                </button>
              );
            }

            return (
              <button
                key={pageNumber}
                type="button"
                className={`btn btn-sm border-none font-bold transition-all duration-300 sm:btn-md ${
                  pageNumber === currentPage
                    ? "scale-105 rounded-xl bg-primary px-5 text-primary-content shadow-lg"
                    : "rounded-xl bg-transparent px-4 text-base-content/70 shadow-none hover:bg-base-100 hover:text-primary hover:shadow-md"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={isLastPage}
          className="btn btn-sm rounded-xl border-none bg-base-200 px-5 font-semibold tracking-wide text-base-content transition-all duration-300 hover:translate-x-1 hover:bg-primary hover:text-primary-content disabled:pointer-events-none disabled:opacity-30 sm:btn-md"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
