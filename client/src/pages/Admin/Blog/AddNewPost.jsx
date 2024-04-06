import React, { useState } from "react";
import SideBar from "../../../components/templates/Admin/SideBar";
import Input from "../../../components/modules/Input";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import UploadWidget from "../../../components/modules/UploadWidget";
import Button from "../../../components/modules/Button";
import useSession from "../../../custom/useSession";

import { toast } from "sonner";

import { LoaderCircle } from "lucide-react";

const AddNewPost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [image, setImage] = useState();
  const { session } = useSession();

  const addHandler = async () => {
    if (!title || !body || !image) {
      return false;
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/blog", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          image,
          user: session.data._id,
        }),
      });

      if (res.status === 201) {
        toast.success("Post added");
        setTimeout(() => {
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
        <h2 className="font-semibold ">Add new Post</h2>
        {image && <img src={image} className="my-3 w-1/6 rounded-lg" alt="" />}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          placeholder="Post Content"
          value={body}
          onChange={(txt) => setBody(txt)}
          theme="snow"
        />
        <Button className={"mt-12"} onClick={addHandler} isDisabled={loading}>
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
          ) : (
            "Add"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddNewPost;
