import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

import Button from "../../../modules/Button";

import { toast } from "sonner";
import swal from "sweetalert";

import EditUserModal from "./EditUserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const banHandler = async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/ban/${id}`, {
      credentials: "include",
      method: "PATCH",
    });
    if (res.status === 200) {
      toast.success("User is Banned");
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  };

  const unBanHandler = async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/unban/${id}`, {
      credentials: "include",
      method: "PATCH",
    });
    if (res.status === 200) {
      toast.success("User is Unbanned");
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  };

  const removeHandler = async (id) => {
    swal({
      title: "Are you Sure ?",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3000/api/users/${id}`, {
          credentials: "include",
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            toast.success("User is Deleted");
            setTimeout(() => {
              window.location.reload();
            }, 700);
          }
        });
      }
    });
  };

  return (
    <>
      <EditUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Joined Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
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
                  <span>{user?.username}</span>
                  <span>{user?.email}</span>
                </th>
                <td className="px-6 py-4 capitalize">{user?.role}</td>
                <td className="px-6 py-4">
                  {user?.shippingAddress || "Empty"}
                </td>
                <td className="px-6 py-4">
                  {user?.isBanned ? (
                    <span className="rounded-lg bg-rose-300 px-4 py-1 text-sm font-semibold text-rose-500">
                      Banned
                    </span>
                  ) : (
                    <span className="rounded-lg bg-green-300 px-4 py-1 text-sm font-semibold text-green-600">
                      Not banned
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {format(user?.createdAt)}
                </td>
                <td className="flex items-center gap-3 px-6 py-4">
                  {user?.isBanned ? (
                    <Button
                      onClick={() => unBanHandler(user?._id)}
                      styles={{
                        backgroundColor: "green",
                      }}
                      className="font-medium"
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      onClick={() => banHandler(user?._id)}
                      styles={{
                        backgroundColor: "red",
                      }}
                      className="font-medium"
                    >
                      Ban
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      navigate({
                        pathname: "/p-admin/users",
                        search: `?user=${user._id}`,
                      });
                      setIsModalOpen(true);
                    }}
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => removeHandler(user._id)}
                    className="ms-3 font-medium text-red-600 hover:underline "
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

export default UsersTable;
