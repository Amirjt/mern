const Button = ({ className, children, isDisabled, onClick, styles }) => {
  return (
    <button
      onClick={onClick}
      style={styles}
      disabled={isDisabled}
      className={`${className} mt-1 flex w-full items-center justify-center rounded-xl bg-main px-3 py-2 text-center text-sm text-white duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default Button;
