import { useState, useEffect } from "react";
import Button from "../../../modules/Button";
import { Link } from "react-router-dom";

import swal from "sweetalert";
import { format } from "timeago.js";
import { toast } from "sonner";

const BlogTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blog")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const removeHandler = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this post ?",
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3000/api/blog/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Post Deleted");
            setTimeout(() => {
              window.location.reload();
            }, 750);
          }
        });
      }
    });
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data.length ? (
        <table class="w-full border border-muted text-left text-sm shadow-md">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center"></div>
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Writer
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((post, index) => (
              <tr
                key={index}
                class="border-b bg-gray-100 duration-200 hover:bg-gray-50"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">{index + 1}</div>
                </td>
                <th
                  scope="row"
                  class="flex flex-col gap-2 whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900"
                >
                  <span>{post.title}</span>
                </th>
                <td class="px-6 py-4">{post.user.username}</td>
                <td class="px-6 py-4">{format(post.createdAt)}</td>
                <td class="flex items-center gap-3 px-6 py-4">
                  <Button>
                    <Link to={`/p-admin/blog/edit-post/${post._id}`}>Edit</Link>
                  </Button>
                  <Button
                    onClick={() => removeHandler(post._id)}
                    styles={{
                      backgroundColor: "red",
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="p-4 text-center text-lg font-bold">
          There is no Post yet
        </h2>
      )}
    </div>
  );
};

export default BlogTable;
