const Box = ({ children }) => {
  return (
    <div className="flex h-[100px] flex-col items-center gap-2 rounded-lg p-5 shadow-md md:w-[160px]">
      {children}
    </div>
  );
};

export default Box;
