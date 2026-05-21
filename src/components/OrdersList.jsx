import { useLoaderData } from "react-router";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrderList = () => {
  const { orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-base-content/60">
          total orders
        </h4>

        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
          {meta.pagination.total}
        </span>
      </div>

      <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200/80">
              <tr className="border-b border-base-300">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-base-content/60">
                  Name
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-base-content/60">
                  Address
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-base-content/60">
                  Products
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-base-content/60">
                  Cost
                </th>
                <th className="hidden px-6 py-5 text-xs font-black uppercase tracking-wider text-base-content/60 sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const id = order.id;
                const { name, address, numItemsInCart, orderTotal, createdAt } =
                  order.attributes;

                const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");

                return (
                  <tr
                    key={id}
                    className="border-b border-base-200 transition duration-300 hover:bg-base-200/60"
                  >
                    <td className="px-6 py-5 font-bold capitalize">{name}</td>

                    <td className="px-6 py-5 text-base-content/70">
                      {address}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-bold">
                        {numItemsInCart}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-black text-primary">
                      {orderTotal}
                    </td>

                    <td className="hidden px-6 py-5 text-sm text-base-content/60 sm:table-cell">
                      {date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
