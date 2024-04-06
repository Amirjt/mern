import { useContext } from "react";
import SingleProduct from "../../modules/SingleProduct";
import Title from "../../modules/Title";

import { Context } from "../../../context/MainContext";

const LatestProducts = () => {
  const { products } = useContext(Context);

  return (
    <div data-aos="fade-up">
      <Title title={"Latest Products"} />
      <div className="grid grid-cols-2 gap-1 p-3 md:grid-cols-3 md:gap-3  lg:grid-cols-5 ">
        {products?.slice(-10).map((product, index) => (
          <SingleProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
