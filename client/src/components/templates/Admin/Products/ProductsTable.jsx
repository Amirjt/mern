import Button from "../../../modules/Button";
import swal from "sweetalert";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProductsTable = ({ products }) => {
  const removeHandler = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this product ?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3000/api/products/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Product Deleted");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      }
    });
  };

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full border border-muted text-left text-sm shadow-md">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center"></div>
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Off
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr class="border-b bg-gray-100 duration-200 hover:bg-gray-50">
                <td class="w-4 p-4">
                  <div class="flex items-center">{index + 1}</div>
                </td>
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {product.name}
                </th>
                <td class="px-6 py-4">{product.color}</td>
                <td class="px-6 py-4">{product.category}</td>
                <td class="px-6 py-4">{product.off}%</td>
                <td class="px-6 py-4 pl-10">{product.quantityAvailable}</td>
                <td class="px-6 py-4 text-emerald-600">${product.price}</td>
                <td class="flex items-center gap-3 px-6 py-4">
                  <Link
                    to={`/p-admin/products/edit-product/${product._id}`}
                    class="mr-4 ms-3 font-medium underline hover:underline"
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => removeHandler(product._id)}
                    href="/sdfds"
                    class="ms-3 font-medium"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
