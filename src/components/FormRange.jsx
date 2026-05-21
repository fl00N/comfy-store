import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ label, name, price, size }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control rounded-2xl bg-base-100 px-4 py-3 shadow-sm">
      <label
        htmlFor={name}
        className="label flex w-full cursor-pointer justify-between pb-2"
      >
        <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/70">
          {label}
        </span>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {formatPrice(selectedPrice)}
        </span>
      </label>

      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
      />

      <div className="mt-2 flex w-full justify-between px-1 text-xs">
        <span className="font-bold text-base-content/60">£0</span>
        <span className="font-bold text-base-content/60">
          {formatPrice(maxPrice)}
        </span>
      </div>
    </div>
  );
};

export default FormRange;
