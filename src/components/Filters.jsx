import { Form, Link, useLoaderData } from "react-router";
import { FormCheckbox, FormInput, FormRange, FormSelect } from "./";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, companies, categories, price, order, shipping } = params;

  return (
    <Form className="grid items-end gap-x-6 gap-y-8 rounded-3xl border border-base-300 bg-base-200/70 px-6 py-8 shadow-sm backdrop-blur sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {" "}
      <FormInput
        label="search product"
        type="search"
        name="search"
        defaultValue={search}
        size="input-sm"
      />
      <FormSelect
        label="companies"
        name="companies"
        list={meta.companies}
        defaultValue={companies}
        size="select-sm"
      />
      <FormSelect
        label="categories"
        name="categories"
        list={meta.categories}
        defaultValue={categories}
        size="select-sm"
      />
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
        size="select-sm"
      />
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
      />
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaulValue={shipping}
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm rounded-full font-bold uppercase tracking-wide shadow-md transition duration-300 hover:scale-105"
      >
        Submit
      </button>
      <Link
        to="/products"
        className="btn btn-accent btn-sm rounded-full font-bold uppercase tracking-wide shadow-md transition duration-300 hover:scale-105"
      >
        Reset
      </Link>
    </Form>
  );
};

export default Filters;
