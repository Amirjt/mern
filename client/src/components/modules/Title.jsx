import React from "react";

const Title = ({ title }) => {
  return (
    <h2 className="relative my-4 w-fit px-10 text-lg font-bold after:absolute after:left-4 after:mt-1.5 after:h-3 after:w-3 after:rotate-45 after:rounded-sm after:bg-main md:text-2xl after:md:left-2 after:md:h-4 after:md:w-4">
      {title}
    </h2>
  );
};

export default Title;
