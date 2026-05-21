import { useLoaderData, Link } from "react-router";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const res = await queryClient.ensureQueryData(
      singleProductQuery(params.id),
    );
    return { product: res.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();

  const { colors, company, description, image, price, title } =
    product.attributes;

  const poundsPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const cartProduct = {
    cartId: product.id + productColor,
    productId: product.id,
    image,
    title,
    company,
    amount,
    price,
    productColor,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section className="pb-24">
      <div className="mb-10 flex items-center justify-between rounded-full border border-base-300 bg-base-100 px-5 py-3 shadow-sm">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link
                to="/"
                className="font-bold text-base-content/50 transition hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="font-bold text-base-content/50 transition hover:text-primary"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>

        <span className="hidden rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary sm:inline-flex">
          product details
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-base-200 p-3 shadow-2xl">
            <img
              src={image}
              alt={title}
              className="h-[32rem] w-full rounded-[1.5rem] object-cover shadow-lg transition duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-xl sm:p-10">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">
              {company}
            </p>

            <h1 className="mt-4 max-w-xl text-4xl font-black capitalize leading-tight tracking-tight sm:text-6xl">
              {title}
            </h1>

            <p className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-2xl font-black text-primary-content shadow-lg">
              {poundsPrice}
            </p>
          </div>

          <div className="rounded-3xl bg-base-200/70 p-5">
            <p className="leading-8 text-base-content/70">{description}</p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-base-content/50">
                Choose color
              </h4>

              <div className="mt-5 flex flex-wrap gap-3">
                {colors.map((color) => {
                  return (
                    <button
                      key={color}
                      type="button"
                      aria-label={`Select ${color}`}
                      className={`h-10 w-10 rounded-2xl shadow-md transition duration-300 hover:-translate-y-1 ${
                        color === productColor
                          ? "ring-4 ring-primary ring-offset-4 ring-offset-base-100"
                          : "ring-2 ring-base-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setProductColor(color)}
                    ></button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
              <label className="label px-0 pt-0">
                <h4 className="text-xs font-black uppercase tracking-[0.25em] text-base-content/50">
                  Quantity
                </h4>
              </label>

              <select
                className="select select-bordered w-full rounded-2xl bg-base-200 font-black shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              >
                {generateAmountOptions(10)}
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="btn btn-primary btn-lg flex-1 rounded-2xl font-black uppercase tracking-wide shadow-xl transition duration-300 hover:-translate-y-1"
              onClick={addToCart}
            >
              Add to bag
            </button>

            <Link
              to="/products"
              className="btn btn-outline btn-lg rounded-2xl font-black uppercase tracking-wide transition duration-300 hover:-translate-y-1"
            >
              Keep shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
