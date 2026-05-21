import { ProductsGrid, SectionTitle } from "./";

const FeaturedProducts = () => {
  return (
    <div className="rounded-3xl bg-base-200/60 px-4 py-16 shadow-sm sm:px-6 lg:px-8">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </div>
  );
};

export default FeaturedProducts;
