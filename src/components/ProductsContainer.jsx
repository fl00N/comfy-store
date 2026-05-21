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
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  return (
    <>
      {total === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : (
        <>
          <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
            <h4 className="font-medium text-md">{totalProducts}</h4>
            <div className="flex gap-x-2">
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
          {layout === "grid" ? <ProductsGrid /> : <ProductsList />}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
