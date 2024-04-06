import { useEffect, useState } from "react";

import Button from "../../../modules/Button";

import { format } from "timeago.js";
import { toast } from "sonner";
import swal from "sweetalert";

const MessagesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/messages", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const fullViewHandler = (message) => {
    swal({
      title: "Message",
      text: message,
    });
  };

  const removeHandler = async (id) => {
    swal({
      title: "Are you sure ? ",
      text: "Are you sure that you want to delete this message ? ",
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3000/api/messages/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Message deleted successfully");
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
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Number
              </th>
              <th scope="col" class="px-6 py-3">
                Message
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
            {data.map((message, index) => (
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
                  <span>{message?.name}</span>
                </th>
                <td class="px-6 py-4">{message?.email}</td>
                <td class="px-6 py-4">{message?.number}</td>
                <td class="px-6 py-4">{message?.message.slice(0, 20)}...</td>
                <td class="px-6 py-4 text-gray-500">
                  {format(message?.createdAt)}
                </td>
                <td class="flex items-center gap-3 px-6 py-4">
                  <Button onClick={() => fullViewHandler(message?.message)}>
                    View
                  </Button>
                  <Button
                    onClick={() => removeHandler(message?._id)}
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
          There is no Message yet
        </h2>
      )}
    </div>
  );
};

export default MessagesTable;
