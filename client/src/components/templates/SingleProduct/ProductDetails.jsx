import { useContext } from "react";
import { Context } from "../../../context/MainContext";

import { Headset, ShieldCheck, ShoppingBasket, Truck } from "lucide-react";

import { MessageCircle } from "lucide-react";
import Button from "../../modules/Button";
import Box from "./Box";
import BreadCrumb from "../../templates/SingleProduct/BreadCrumb";

const ProductDetails = ({ product }) => {
  const { cart, setCart, addToCartHandler } = useContext(Context);
  return (
    <>
      <div className="flex flex-col gap-7">
        <BreadCrumb title={product?.name} link={`${product?._id}`} />
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MessageCircle strokeWidth={1.1} size={19} className="mb-0.5" />
            <span>{product?.comments.length}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <span className="text-primary text-2xl font-semibold text-emerald-500">
            $
            {product?.off !== 0
              ? (
                  product?.price -
                  (product?.off / 100) * product?.price
                ).toLocaleString()
              : product?.price.toLocaleString()}
          </span>
          <span className="text-xl font-semibold text-rose-500 line-through opacity-50">
            {product?.off !== 0 && "$" + product?.price}
          </span>
        </div>
        <p className="text-sm leading-7 text-gray-500">
          {product?.shortdescription}
        </p>
        <div className="flex items-center gap-2">
          <h5 className="ml-1 text-lg font-bold">Color :</h5>
          <span
            style={{
              backgroundColor: product?.color,
            }}
            className={`h-5 w-5 rounded-full`}
          ></span>
        </div>
        <div className="flex items-center gap-2">
          <h5 className="ml-1 font-semibold">Category</h5>
          <span>{product?.category}</span>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Button
            onClick={() => addToCartHandler(product)}
            className="flex h-[60px] items-center gap-2 font-semibold"
          >
            Add To Cart
            <ShoppingBasket size={20} strokeWidth={1.7} />
          </Button>
          <div className="flex items-center gap-3">
            <Box>
              <ShieldCheck strokeWidth={1.2} size={27} />
              <span className="text-xs sm:text-base">Secure</span>
            </Box>
            <Box>
              <Truck strokeWidth={1.2} size={27} />
              <span className="text-xs sm:text-base">Quick Delivery</span>
            </Box>
            <Box>
              <Headset strokeWidth={1.2} size={27} />
              <span className="text-xs sm:text-base">24 Support</span>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
