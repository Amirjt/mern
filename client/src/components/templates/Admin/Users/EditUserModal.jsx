import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../modules/Input";
import Button from "../../../modules/Button";
import { X } from "lucide-react";

import { toast } from "sonner";

const EditUserModal = ({ isModalOpen, setIsModalOpen }) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = location.search.split("=")[1];
    const getData = () => {
      fetch(`http://localhost:3000/api/users/${id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUserData(data));
    };

    id && getData();
  }, [location]);

  const editUserHandler = async () => {
    const id = location.search.split("=")[1];
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 200) {
      setIsModalOpen(false);
      toast.success("User Edited");
      setTimeout(() => {
        navigate({
          search: "",
        });
        window.location.reload();
      }, 700);
    }
  };

  return (
    <>
      <div
        className={`${isModalOpen ? "visible opacity-100" : "invisible opacity-0"} fixed inset-0 z-[1000] flex h-screen w-full items-center justify-center bg-black bg-opacity-50 duration-200`}
      >
        <div
          className={`relative flex w-full m-5 md:w-1/3 flex-col gap-3 rounded-lg border border-muted bg-white p-5 ${isModalOpen ? "visible scale-100 opacity-100" : "invisible  scale-0  opacity-0 "} duration-200`}
        >
          <X
            onClick={() => {
              navigate({
                search: "",
              });
              setIsModalOpen(false);
            }}
            className="absolute right-3 top-3 cursor-pointer"
            strokeWidth={1.1}
          />
          <h2 className="font-semibold ">Editing User</h2>
          <Input
            placeholder="Username"
            value={userData?.username}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Email"
            value={userData?.email}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <select
            value={userData?.role}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                role: e.target.value,
              }))
            }
            id="countries"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 "
          >
            <option
              className="flex items-center justify-between"
              value={"Admin"}
            >
              Admin
            </option>
            <option
              className="flex items-center justify-between"
              value={"Customer"}
            >
              Customer
            </option>
          </select>
          <Input
            placeholder="Shipping Address"
            value={userData?.shippingAddress}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                shippingAddress: e.target.value,
              }))
            }
          />
          <Button onClick={editUserHandler}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
