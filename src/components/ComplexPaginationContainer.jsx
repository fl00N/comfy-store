import { useLoaderData, useLocation, useNavigate } from "react-router";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = (pageNumber) => {
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
  };

  const renderPageBtns = () => {
    const pageButtons = [];

    pageButtons.push(addPageBtn(1));

    if (page > 3) {
      pageButtons.push(
        <button key={"start-ellipsis"} className="mx-2">
          ...
        </button>,
      );
    }

    if (page > 2) {
      pageButtons.push(addPageBtn(page - 1));
    }

    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageBtn(page));
    }

    if (page < pageCount - 1) {
      pageButtons.push(addPageBtn(page + 1));
    }

    if (page < pageCount - 2) {
      pageButtons.push(
        <button key={"end-ellipsis"} className="mx-2">
          ...
        </button>,
      );
    }

    pageButtons.push(addPageBtn(pageCount));

    return pageButtons;
  };

  const showPrev = page > 1;
  const showNext = page < pageCount;

  return (
    <div className="mt-10 flex justify-center">
      <div className="join">
        {showPrev && (
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={() => {
              let prevPage = page - 1;
              handlePageChange(prevPage);
            }}
          >
            Prev
          </button>
        )}

        {renderPageBtns()}

        {showNext && (
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={() => {
              let nextPage = page + 1;
              handlePageChange(nextPage);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
