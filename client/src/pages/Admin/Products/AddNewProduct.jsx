import SideBar from "../../../components/templates/Admin/SideBar";
import Input from "../../../components/modules/Input";
import TextArea from "../../../components/modules/TextArea";

import { LoaderCircle } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { categories } from "../../../lib/constants";
import Button from "../../../components/modules/Button";
import UploadWidget from "../../../components/modules/UploadWidget";
import { useState } from "react";
import { toast } from "sonner";

import { ReactSortable } from "react-sortablejs";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const addProductHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const price = formData.get("price");
    const off = formData.get("off");
    const quantity = formData.get("quantity");
    const color = formData.get("color");

    if (
      !name.trim() ||
      !shortDescription.trim() ||
      !price.trim() ||
      !quantity.trim() ||
      !color.trim()
    ) {
      return setErr("Please Fill the Fields");
    }

    try {
      setErr("");
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          shortDescription,
          description,
          price: +price,
          off: +off,
          category,
          quantityAvailable: quantity,
          color,
          images,
        }),
      });

      if (res.status === 201) {
        toast.success("Product Added");
        window.location.reload();
        window.location.replace("/p-admin/products");
      }
    } catch (error) {
      setErr("There is Something wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-2 p-10">
        <h2 className="font-semibold ">Add new product</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <ReactSortable
              className="mt-4 flex w-full gap-3 mb-4"
              list={images}
              direction={"horizontal"}
              setList={(newImages) => setImages(newImages)}
            >
              {images?.length &&
                images?.map((image, index) => (
                  <img
                    key={index}
                    className="h-24 w-24 rounded-lg"
                    src={image}
                    alt="images"
                  />
                ))}
            </ReactSortable>
            <form
              onSubmit={addProductHandler}
              action=""
              className="flex flex-col gap-2"
            >
              <UploadWidget
                uwConfig={{
                  cloudName: "debudulrf",
                  uploadPreset: "ecommerce",
                  multiple: true,
                  folder: "products",
                }}
                setImages={setImages}
              />
              <Input name={"name"} placeholder={"Name"} />
              <TextArea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder={"Short Description"}
                rows={"8"}
              />
              <Input
                name={"price"}
                placeholder={"Price in USD"}
                className={"md:mt-12"}
              />
              <Input name={"off"} placeholder={"Off"} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="countries"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 "
              >
                <option selected>Choose a category</option>
                {categories.map((cat, index) => (
                  <option
                    key={index}
                    className="flex items-center justify-between"
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <Input name={"quantity"} placeholder={"Quantity Available"} />
              <Input name={"color"} placeholder={"Color"} />
              {err && <p className="text-sm text-rose-500">{err}</p>}
              <Button isDisabled={loading}>
                {loading ? (
                  <LoaderCircle
                    className="animate-spin"
                    size={20}
                    strokeWidth={1}
                  />
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </div>
          <div className="md:w-1/2">
            <ReactQuill
              value={description}
              onChange={(txt) => setDescription(txt)}
              className="rounded-lg"
              placeholder="Product Fully Description"
              theme="snow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
