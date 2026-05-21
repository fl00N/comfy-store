const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label pb-1">
        <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/70">
          {label}
        </span>
      </label>

      <input
        type={type}
        name={name}
        className={`input input-bordered w-full rounded-full bg-base-100 shadow-sm transition duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${size}`}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInput;
