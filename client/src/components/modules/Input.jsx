const Input = ({
  className,
  placeholder,
  name,
  icon,
  isHidden,
  value,
  onChange,
}) => {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-muted px-3 py-1 shadow-sm outline-none duration-200 hover:bg-gray-100 ${className}`}
    >
      <input
        value={value}
        onChange={onChange}
        autoComplete="off"
        name={name}
        className="w-full bg-transparent p-1 text-sm outline-none placeholder:text-[12px] placeholder:text-gray-500"
        placeholder={placeholder}
        type={isHidden ? "password" : "text"}
      />
      {icon && <div className="ml-2">{icon}</div>}
    </div>
  );
};

export default Input;
