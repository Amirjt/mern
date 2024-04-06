const ReviewBox = ({ title, icon, count }) => {
  return (
    <div className="flex h-[160px] w-[160px] flex-col gap-5 rounded-lg p-5 shadow-md">
      <span className="self-start font-semibold">{title}</span>
      <span className="self-center text-xl font-bold text-main">{count}</span>
      <span className="self-end">{icon}</span>
    </div>
  );
};

export default ReviewBox;
