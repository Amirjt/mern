import { useState, useEffect } from "react";
import Button from "../../../modules/Button";

import swal from "sweetalert";
import { toast } from "sonner";

const CommentsTable = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/comments", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const viewHandler = (body) => {
    swal({
      title: "Comment",
      text: body,
    });
  };

  const removeHandler = async (id) => {
    swal({
      title: "Are you sure ?",
      text: "Are you sure that you want to delete this comment ?",
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3000/api/comments/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Comment Deleted Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 750);
          }
        });
      }
    });
  };

  const confirmHandler = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (res.status === 200) {
        toast.success("Comment Confirmed");
        setTimeout(() => {
          window.location.reload();
        }, 750);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full border border-muted text-left text-sm shadow-md">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Text
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr
              key={index}
              className="border-b bg-gray-100 duration-200 hover:bg-gray-50"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">{index + 1}</div>
              </td>
              <th
                scope="row"
                className="flex flex-col gap-2 whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900"
              >
                <span>{comment?.userId.username}</span>
                <span>{comment?.userId.email}</span>
              </th>
              <td className="px-6 py-4">{comment?.productId?.name}</td>
              <td className="px-6 py-4">{comment?.body.slice(0, 20)}...</td>
              <td className="px-6 py-4">
                <span className="rounded-lg px-4 py-1 text-sm font-semibold text-yellow-600">
                  {comment?.rating}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {comment?.confirmedByAdmin ? (
                  <span className="rounded-lg bg-emerald-200 px-4 py-1 font-semibold text-emerald-500">
                    Confirmed
                  </span>
                ) : (
                  <span className="rounded-lg bg-red-200 px-4 py-1 font-semibold text-red-500">
                    Not Confirmed
                  </span>
                )}
              </td>
              <td className="flex items-center gap-3 px-6 py-4">
                <Button onClick={() => viewHandler(comment?.body)}>View</Button>
                {!comment?.confirmedByAdmin && (
                  <Button onClick={() => confirmHandler(comment?._id)}>
                    Confirm
                  </Button>
                )}
                <Button
                  onClick={() => removeHandler(comment._id)}
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
    </div>
  );
};

export default CommentsTable;
