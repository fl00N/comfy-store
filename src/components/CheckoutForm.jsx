import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { customFetch, formatPrice } from "../utils";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { Form, redirect } from "react-router";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const data = {
      user,
      name,
      address,
      cartItems,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      numItemsInCart,
    };

    try {
      const res = await customFetch.post(
        "/orders",
        { data },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());

      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.error(error);
      const errMsg =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form
      method="POST"
      className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8"
    >
      <div className="mb-8 border-b border-base-300 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
          checkout
        </p>

        <h4 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
          Shipping Information
        </h4>

        <p className="mt-2 text-sm text-base-content/60">
          Enter your details below to complete your order.
        </p>
      </div>

      <div className="flex flex-col gap-y-5">
        <FormInput label="first name" name="name" type="text" />
        <FormInput label="address" name="address" type="text" />
      </div>

      <div className="mt-8">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
