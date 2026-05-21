import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
  const cartState = useSelector((state) => state.cartState);
  const { cartTotal, shipping, tax, orderTotal } = cartState;

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl">
      <h3 className="mb-6 text-lg font-black tracking-tight">Order Summary</h3>

      <div className="space-y-4">
        <p className="flex justify-between border-b border-base-300 pb-3 text-sm">
          <span className="text-base-content/60">Subtotal</span>
          <span className="font-bold">{formatPrice(cartTotal)}</span>
        </p>

        <p className="flex justify-between border-b border-base-300 pb-3 text-sm">
          <span className="text-base-content/60">Shipping</span>
          <span className="font-bold">{formatPrice(shipping)}</span>
        </p>

        <p className="flex justify-between border-b border-base-300 pb-3 text-sm">
          <span className="text-base-content/60">Tax</span>
          <span className="font-bold">{formatPrice(tax)}</span>
        </p>

        <p className="flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-4">
          <span className="font-black">Order Total</span>
          <span className="text-xl font-black text-primary">
            {formatPrice(orderTotal)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
