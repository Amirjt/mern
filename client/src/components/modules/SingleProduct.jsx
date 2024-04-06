import { Link } from "react-router-dom";

import { ShoppingBasket } from "lucide-react";

import Button from "../../components/modules/Button";

const SingleProduct = ({ product }) => {
  return (
    <div className="group relative my-1 flex  cursor-pointer flex-col gap-7 rounded-lg border border-muted p-7 shadow-sm duration-200 hover:shadow-lg">
      {product?.off !== 0 && (
        <span className="absolute -left-2 -top-3 flex h-7 w-7 -rotate-45 animate-pulse items-center justify-center rounded-lg  bg-rose-500 text-xs text-white">
          {product?.off}%
        </span>
      )}
      <ShoppingBasket
        className="invisible absolute left-3 top-4 z-50 -translate-x-3 opacity-0 duration-500 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
        strokeWidth={1.0}
      />
      <img
        className="w-[200px] h-[180px] duration-300 group-hover:scale-105 mx-auto"
        src={product?.images[0]}
        alt=""
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold leading-6">
          {product?.name.slice(0, 24)}...
        </h3>
        <div className="flex items-center justify-between gap-3">
          <span className="text-primary text-lg font-semibold text-emerald-500">
            $
            {product?.off !== 0
              ? (
                  product?.price -
                  (product?.off / 100) * product?.price
                ).toLocaleString()
              : product?.price.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-rose-500 line-through opacity-50">
            {product?.off !== 0 && "$" + product?.price}
          </span>
        </div>
        <Button className={"flex items-center gap-2 font-semibold"}>
          <Link to={`/products/${product?._id}`}>Shop now</Link>
          <ShoppingBasket strokeWidth={1.8} size={18} />
        </Button>
      </div>
    </div>
  );
};

export default SingleProduct;
