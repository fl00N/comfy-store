import { useDispatch, useSelector } from "react-redux";
import { CartItemList, CartTotals, SectionTitle } from "../components";
import { Link } from "react-router";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const cartState = useSelector((state) => state.cartState);
  const user = useSelector((state) => state.userState.user);
  const { numItemsInCart } = cartState;
  const dispatch = useDispatch();

  if (numItemsInCart === 0)
    return <SectionTitle text={"Your cart is empty!"} />;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className="pb-20">
      <div className="rounded-3xl border border-base-300 bg-base-200/70 px-5 py-8 shadow-sm sm:px-8">
        <div className="flex flex-col gap-4 border-b border-base-300 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
              your bag
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Shopping Cart
            </h1>
          </div>

          <button
            className="btn btn-error btn-outline rounded-full px-6 font-bold uppercase tracking-wide transition duration-300 hover:scale-105"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CartItemList />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <CartTotals />

              {user ? (
                <Link
                  to="/checkout"
                  className="btn btn-primary btn-block mt-6 rounded-full font-bold uppercase tracking-wide shadow-lg transition duration-300 hover:scale-105"
                >
                  Proceed to checkout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-block mt-6 rounded-full font-bold uppercase tracking-wide shadow-lg transition duration-300 hover:scale-105"
                >
                  Please Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
