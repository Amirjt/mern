import { Link } from "react-router-dom";
import { format } from "timeago.js";

const SinglePost = ({ post }) => {
  return (
    <div
      data-aos="fade-down"
      className="flex flex-col gap-3 rounded-lg shadow-xl"
    >
      <img className="rounded-t-lg" src={post.image} alt="" />
      <div className="flex flex-col gap-3 border-b p-2 pb-3">
        <h2 className="font-bold">
          {post.title.slice(0, 50)}
          <Link className="text-main" to={`/blog/${post._id}`}>
            more...
          </Link>
        </h2>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-2">
          <img src="/images/noavatar.png" width={30} alt="" />
          <span className="text-sm font-semibold">{post.user.username}</span>
        </div>
        <span className="text-sm">{format(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default SinglePost;
