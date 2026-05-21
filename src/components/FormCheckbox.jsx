const FormCheckbox = ({ label, name, defaulValue, size }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaulValue}
        className={`checkbox checkbox-primary ml-2 ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
