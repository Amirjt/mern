import SideBar from "../../components/templates/Admin/SideBar";
import UsersTable from "../../components/templates/Admin/Users/UsersTable";

const Users = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Users</h2>
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
