import { Link, useLoaderData } from "react-router";
import { formatPrice } from "../utils";

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const poundsPrice = formatPrice(price);

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card group w-full overflow-hidden rounded-3xl bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <figure className="overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110 md:h-64"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wide transition duration-300 group-hover:text-primary">
                {title}
              </h2>

              <span className="rounded-full bg-primary/10 px-4 py-2 font-bold text-primary">
                {poundsPrice}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
