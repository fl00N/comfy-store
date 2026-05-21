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
    <>
      <div className="flex justify-between border-b border-base-300 pb-5">
        <p className="text-3xl font-medium tracking-wider capitalize">
          Shopping cart
        </p>

        {/* Make modal after clicking clear cart */}
        <button className="btn btn-primary" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />

          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Procced to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
