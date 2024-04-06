import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const handler = () => {
      window.scrollY > 200 ? setIsAvailable(true) : setIsAvailable(false);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-5 z-50">
      <button
        className={`bg-main duration-300 ${
          isAvailable ? "visible opacity-100" : "invisible"
        } rounded-full px-2 py-2 text-sm text-white opacity-0`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ChevronUp strokeWidth={1.3} />
      </button>
    </div>
  );
};

export default BackToTop;
