import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cart/cartSlice";
import { formatPrice, generateAmountOptions } from "../utils";

const CartItem = ({ cartItem }) => {
  const { cartId, title, price, image, amount, company, productColor } =
    cartItem;

  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem(cartId));
  };

  const handleEdit = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  return (
    <article className="grid gap-5 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[8rem_1fr_auto] sm:items-center">
      <img
        src={image}
        alt={title}
        className="h-40 w-full rounded-2xl object-cover shadow-md sm:h-32 sm:w-32"
      />

      <div>
        <h3 className="text-lg font-black capitalize tracking-tight">
          {title}
        </h3>

        <h4 className="mt-1 text-sm font-semibold capitalize text-base-content/50">
          {company}
        </h4>

        <p className="mt-4 flex items-center gap-x-3 text-sm font-medium capitalize text-base-content/70">
          color:
          <span
            className="h-5 w-5 rounded-full border border-base-300 shadow-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>

        <button
          className="mt-4 text-sm font-bold uppercase tracking-wide text-error transition duration-300 hover:text-error/70"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end">
        <div className="form-control w-28">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/60">
              Amount
            </span>
          </label>

          <select
            name="amount"
            id="amount"
            className="select select-bordered select-sm mt-2 rounded-full bg-base-200 font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={amount}
            onChange={handleEdit}
          >
            {generateAmountOptions(10)}
          </select>
        </div>

        <p className="rounded-full bg-primary/10 px-4 py-2 font-black text-primary">
          {formatPrice(price)}
        </p>
      </div>
    </article>
  );
};

export default CartItem;
