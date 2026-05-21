const FormCheckbox = ({ label, name, defaulValue, size }) => {
  return (
    <div className="form-control items-center rounded-2xl bg-base-100 px-4 py-3 shadow-sm">
      <label htmlFor={name} className="label cursor-pointer pb-2 pr-3">
        <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/70">
          {label}
        </span>
      </label>

      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaulValue}
        className={`checkbox checkbox-primary rounded-md shadow-sm transition duration-300 hover:scale-110 ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
