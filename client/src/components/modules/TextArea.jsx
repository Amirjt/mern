const TextArea = ({ className, placeholder, name, value, onChange, rows }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} flex items-center justify-between rounded-xl border border-muted p-1 px-3 py-1 text-sm  shadow-sm outline-none duration-200 placeholder:text-[12px] placeholder:text-gray-500 hover:bg-gray-100`}
      rows={rows || "15"}
    ></textarea>
  );
};

export default TextArea;
