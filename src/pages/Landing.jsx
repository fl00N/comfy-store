import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryCLient) => async () => {
  const response = await queryCLient.ensureQueryData(featuredProductsQuery);
  return { products: response.data.data };
};

const Landing = () => {
  return (
    <div className="space-y-24">
      <Hero />
      <FeaturedProducts />
    </div>
  );
};

export default Landing;
