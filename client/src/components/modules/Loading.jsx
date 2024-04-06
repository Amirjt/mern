import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="z-[1000] flex h-screen w-full items-center justify-center bg-white">
      <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
    </div>
  );
};

export default Loading;
