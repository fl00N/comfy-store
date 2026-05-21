import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const [prevPageDisabled, setPrevPageDisabled] = useState(page === 1);
  const [nextPageDisabled, setNextPageDisabled] = useState(
    page === pages.length,
  );

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-center">
      <div className="join">
        <button
          className={`btn btn-xs sm:btn-md join-item ${prevPageDisabled && "btn-disabled"}`}
          onClick={() => {
            let prevPage = page - 1;
            if (page > 1) setPrevPageDisabled(false);
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className={`btn btn-xs sm:btn-md join-item ${nextPageDisabled && "btn-disabled"}`}
          onClick={() => {
            let nextPage = page + 1;
            if (page < pages.length) setNextPageDisabled(false);
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
