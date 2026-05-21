import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router";
import { customFetch } from "../utils/index";
import { OrdersList, PaginationContainer, SectionTitle } from "../components";

const ordersQuery = (user, params) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You need to be logged in!");
      return redirect("/login");
    }

    const params = Object.fromEntries(new URL(request.url).searchParams);

    try {
      const res = await queryClient.ensureQueryData(ordersQuery(user, params));

      return { orders: res.data.data, meta: res.data.meta };
    } catch (error) {
      console.error(error);
      const errMsg =
        error?.response?.data?.error?.message || "There was an error";
      toast.error(errMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1)
    return <SectionTitle text={"Please make an order"} />;

  return (
    <div>
      <SectionTitle text={"Your Orders"} />
      <OrdersList />
      <PaginationContainer />
    </div>
  );
};

export default Orders;
