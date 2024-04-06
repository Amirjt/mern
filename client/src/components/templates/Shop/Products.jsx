import { Search } from "lucide-react";
import Input from "../../modules/Input";
import SingleProduct from "../../modules/SingleProduct";

const Products = ({ search, setSearch, products }) => {
  return (
    <div>
      <div className="flex">
        <Input
          placeholder={"Search..."}
          value={search}
          icon={<Search size={19} strokeWidth={1} />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {products?.map((product, index) => (
          <SingleProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
