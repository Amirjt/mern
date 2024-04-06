import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../../components/templates/Admin/SideBar";

import UploadWidget from "../../../components/modules/UploadWidget";
import Input from "../../../components/modules/Input";
import Button from "../../../components/modules/Button";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { LoaderCircle } from "lucide-react";

import { toast } from "sonner";

const EditPost = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const editHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/blog/${params.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("Product Edited");
        setTimeout(() => {
          window.location.reload();
          window.location.replace("/p-admin/blog");
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
        <h2 className="font-semibold ">Edit Post</h2>
        {!image ? (
          <img src={data?.image} className="my-3 w-1/6 rounded-lg" alt="" />
        ) : (
          <img src={image} className="my-3 w-1/6 rounded-lg" alt="" />
        )}
        <UploadWidget
          uwConfig={{
            cloudName: "debudulrf",
            uploadPreset: "ecommerce",
            multiple: false,
            folder: "posts",
          }}
          setImage={setImage}
        />
        <Input
          placeholder={"Title"}
          value={data?.title}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <ReactQuill
          value={data?.body}
          onChange={(txt) =>
            setData((prev) => ({
              ...prev,
              body: txt,
            }))
          }
          placeholder="Post Content"
          theme="snow"
        />
        <Button onClick={editHandler} className={"mt-12"} isDisabled={loading}>
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditPost;
