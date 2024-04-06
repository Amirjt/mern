import SideBar from "../../components/templates/Admin/SideBar";
import MessagesTable from "../../components/templates/Admin/Messages/MessagesTable";

const Messages = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Messages</h2>
        <MessagesTable />
      </div>
    </div>
  );
};

export default Messages;
