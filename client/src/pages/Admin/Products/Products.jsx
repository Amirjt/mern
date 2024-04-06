import { useContext } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import ProductsTable from "../../../components/templates/Admin/Products/ProductsTable";
import SideBar from "../../../components/templates/Admin/SideBar";

import { Context } from "../../../context/MainContext";

const Products = () => {
  const { products } = useContext(Context);

  return (
    <div className="relative flex h-screen ">
      <Link to={"/p-admin/products/add-new-product"}>
        <PlusCircle
          className="absolute right-3 top-5 cursor-pointer"
          strokeWidth={1.1}
        />
      </Link>
      <div className="sticky top-3 w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Products</h2>
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default Products;
