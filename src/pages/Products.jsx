import { customFetch } from "../utils/index";
import { Filters, ProductsContainer, PaginationContainer } from "../components";

const allProductsQuery = (queryParams) => {
  const { search, categories, companies, price, order, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      categories ?? "all",
      companies ?? "all",
      price ?? 100000,
      order ?? "a-z",
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch("/products", { params: queryParams }),
  };
};

export const loader =
  (queryCLient) =>
  async ({ request }) => {
    const params = Object.fromEntries(new URL(request.url).searchParams);

    const res = await queryCLient.ensureQueryData(allProductsQuery(params));

    const products = res.data.data;
    const meta = res.data.meta;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
