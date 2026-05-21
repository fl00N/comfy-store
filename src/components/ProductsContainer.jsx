import { useLoaderData } from "react-router";
import { ProductsList, ProductsGrid } from "./";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const { total } = meta.pagination;

  const [layout, setLayout] = useState("grid");

  const totalProducts = total > 1 ? `${total} Products` : `${total} Product`;

  const setActiveStyles = (pattern) => {
    return `btn btn-circle btn-sm text-xl shadow-sm transition duration-300 hover:scale-105 ${
      pattern === layout
        ? "btn-primary text-primary-content shadow-md"
        : "btn-ghost bg-base-200 text-base-content hover:bg-base-300"
    }`;
  };

  return (
    <>
      {total === 0 ? (
        <div className="mt-16 rounded-3xl border border-base-300 bg-base-200/70 px-8 py-16 text-center shadow-sm">
          <h5 className="text-2xl font-bold tracking-tight">
            Sorry, no products matched your search...
          </h5>
          <p className="mt-3 text-base-content/60">
            Try changing your filters or searching for something else.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 flex items-center justify-between rounded-3xl border border-base-300 bg-base-200/70 px-5 py-4 shadow-sm backdrop-blur">
            <h4 className="rounded-full bg-base-100 px-4 py-2 text-sm font-bold uppercase tracking-wider text-base-content/70 shadow-sm">
              {totalProducts}
            </h4>

            <div className="flex gap-x-2 rounded-full bg-base-100 p-2 shadow-sm">
              <button
                onClick={() => setLayout("grid")}
                className={setActiveStyles("grid")}
              >
                <BsFillGridFill />
              </button>

              <button
                onClick={() => setLayout("list")}
                className={setActiveStyles("list")}
              >
                <BsList />
              </button>
            </div>
          </div>

          <div className="mt-8">
            {layout === "grid" ? <ProductsGrid /> : <ProductsList />}
          </div>
        </>
      )}
    </>
  );
};

export default ProductsContainer;
