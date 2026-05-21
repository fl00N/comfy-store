const FormSelect = ({ label, name, list, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label pb-1" htmlFor={name}>
        <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/70">
          {label}
        </span>
      </label>

      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`select select-bordered w-full rounded-full bg-base-100 shadow-sm transition duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${size}`}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
