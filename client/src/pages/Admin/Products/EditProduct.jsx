import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SideBar from "../../../components/templates/Admin/SideBar";
import Input from "../../../components/modules/Input";
import TextArea from "../../../components/modules/TextArea";
import Button from "../../../components/modules/Button";

import { LoaderCircle } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { categories } from "../../../lib/constants";
import UploadWidget from "../../../components/modules/UploadWidget";
import { toast } from "sonner";

import { ReactSortable } from "react-sortablejs";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    shortdescription: "",
    description: "",
    price: "",
    off: "",
    category: "",
    quantityAvailable: 0,
    color: "",
    images: [],
  });
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          credentials: "include",
        });
        if (res.ok) {
          const product = await res.json();
          setProductData(product);
        } else {
          throw new Error("Failed to fetch product data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const editProductHandler = async (e) => {
    e.preventDefault();
    const {
      name,
      shortdescription,
      description,
      price,
      off,
      category,
      quantityAvailable,
      color,
    } = productData;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          shortdescription,
          description,
          price: +price,
          off: +off,
          category,
          quantityAvailable,
          color,
          images: images.length ? images : productData.images,
        }),
      });

      if (res.status === 200) {
        toast.success("Product Edited");
        setTimeout(() => {
          window.location.reload();
        }, 750);
      }
    } catch (error) {
      console.log(error);
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
        <h2 className="font-semibold ">Edit Product</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <ReactSortable
              className="mb-4 mt-4 flex w-full gap-3"
              list={images.length ? images : productData.images}
              direction={"horizontal"}
              setList={(newImages) =>
                setProductData((prevProductData) => ({
                  ...prevProductData,
                  images: newImages,
                }))
              }
            >
              {images.length !== 0
                ? images?.map((image, index) => (
                    <img
                      key={index}
                      className="h-24 w-24 rounded-lg"
                      src={image}
                      alt="images"
                    />
                  ))
                : productData.images?.length &&
                  productData.images?.map((image, index) => (
                    <img
                      key={index}
                      className="h-24 w-24 rounded-lg"
                      src={image}
                      alt="images"
                    />
                  ))}
            </ReactSortable>
            <form
              onSubmit={editProductHandler}
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
              <Input
                value={productData.name}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    name: e.target.value,
                  }))
                }
                placeholder={"Name"}
              />
              <TextArea
                value={productData.shortdescription}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    shortdescription: e.target.value,
                  }))
                }
                placeholder={"Short Description"}
                rows={"8"}
              />
              <Input
                value={productData.price}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    price: e.target.value,
                  }))
                }
                placeholder={"Price in USD"}
                className={"md:mt-12"}
              />
              <Input
                value={productData.off}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    off: e.target.value,
                  }))
                }
                placeholder={"Off"}
              />
              <select
                value={productData.category}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    category: e.target.value,
                  }))
                }
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 "
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
              <Input
                value={productData.quantityAvailable}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    quantityAvailable: e.target.value,
                  }))
                }
                placeholder={"Quantity Available"}
              />
              <Input
                value={productData.color}
                onChange={(e) =>
                  setProductData((prevProductData) => ({
                    ...prevProductData,
                    color: e.target.value,
                  }))
                }
                placeholder={"Color"}
              />
              <Button isDisabled={loading}>
                {loading ? (
                  <LoaderCircle
                    className="animate-spin"
                    size={20}
                    strokeWidth={1}
                  />
                ) : (
                  "Edit"
                )}
              </Button>
            </form>
          </div>
          <div className="md:w-1/2">
            <ReactQuill
              value={productData.description}
              onChange={(txt) =>
                setProductData((prevProductData) => ({
                  ...prevProductData,
                  description: txt,
                }))
              }
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

export default EditProduct;
