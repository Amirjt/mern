import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ link, title }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Link to={"/"}>Home /</Link>
      <Link to={"/shop"}>Products /</Link>
      <Link to={`/products/${link}`} className="text-main">
        {title}
      </Link>
    </div>
  );
};

export default BreadCrumb;
