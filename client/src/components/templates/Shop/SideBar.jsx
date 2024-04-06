import { ChevronDown, DollarSign } from "lucide-react";
import { brands, categories } from "../../../lib/constants";
import Input from "../../modules/Input";
import Button from "../../modules/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SideBar = ({ search, setFiltered }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    cat: null,
    brand: null,
    min: null,
    max: null,
  });
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (filters.cat) queryParams.set("cat", filters.cat);
        if (filters.brand) queryParams.set("brand", filters.brand);
        if (filters.min) queryParams.set("min", filters.min);
        if (filters.max) queryParams.set("max", filters.max);
        if (search) queryParams.set("search", search);
        const url = `api/products?${queryParams.toString()}`;
        navigate(`?${queryParams.toString()}`);
        const response = await fetch(`http://localhost:3000/${url}`);
        const data = await response.json();
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, filters]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <ChevronDown
          className={`${isOpen && "rotate-180"} duration-200 lg:hidden`}
          strokeWidth={1}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Categories :</h2>
          <div className="mt-1 flex flex-col gap-1">
            {categories.map((cat, index) => (
              <div key={index} class="mb-1 flex items-center">
                <input
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      cat: e.target.value,
                    }))
                  }
                  id={cat.name}
                  type="radio"
                  value={cat.name}
                  className="h-4 w-4"
                  name="cat"
                />
                <label
                  for={cat.name}
                  class="ms-2 flex w-full items-center justify-between text-sm font-medium"
                >
                  {cat.name}
                  {cat.icon}
                </label>
              </div>
            ))}
          </div>
          <h2 className="text-sm font-semibold">Brand :</h2>
          <div className="mt-1 flex flex-col gap-1">
            {brands.map((brand, index) => (
              <div key={index} class="mb-1 flex items-center">
                <input
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      brand: e.target.value,
                    }))
                  }
                  id={brand.name}
                  type="radio"
                  value={brand.name}
                  className="h-4 w-4"
                  name="brand"
                />
                <label for={brand.name} class="ms-2 text-sm font-medium">
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
          <h2 className="text-sm font-semibold">Price :</h2>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={filters.min}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  min: e.target.value,
                }))
              }
              placeholder={"Min"}
              icon={<DollarSign size={10} strokeWidth={1} />}
            />
            <Input
              value={filters.max}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  max: e.target.value,
                }))
              }
              placeholder={"Max"}
              icon={<DollarSign size={10} strokeWidth={1} />}
            />
          </div>
          <Button
            onClick={() => {
              navigate({
                search: "",
              });
              window.location.reload();
            }}
            className={"font-semibold"}
          >
            Clear Filteres
          </Button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
