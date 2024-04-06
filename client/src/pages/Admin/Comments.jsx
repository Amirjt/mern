import CommentsTable from "../../components/templates/Admin/Comments/CommentsTable";
import SideBar from "../../components/templates/Admin/SideBar";

const Comments = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Comments</h2>
        <CommentsTable />
      </div>
    </div>
  );
};

export default Comments;
