import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const customFetch = axios.create({
  baseURL: baseURL,
});

export const formatPrice = (price) => {
  const newPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format((price / 100).toFixed(2));
  return newPrice;
};

export const generateAmountOptions = (number) => {
  if (number > 10) number = 10;

  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
