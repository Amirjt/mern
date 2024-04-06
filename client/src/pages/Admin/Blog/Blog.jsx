import { Link } from "react-router-dom";
import BlogTable from "../../../components/templates/Admin/Blog/BlogTable";
import SideBar from "../../../components/templates/Admin/SideBar";

import { PlusCircle } from "lucide-react";

const Blog = () => {
  return (
    <div className="relative flex h-screen ">
      <Link to={"/p-admin/blog/add-new-post"}>
        <PlusCircle
          className="absolute right-3 top-5 cursor-pointer"
          strokeWidth={1.1}
        />
      </Link>
      <div className="sticky top-3 w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Posts</h2>
        <BlogTable />
      </div>
    </div>
  );
};

export default Blog;
