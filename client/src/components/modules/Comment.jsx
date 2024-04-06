import { Star } from "lucide-react";

import { format } from "timeago.js";

const Comment = ({ comment }) => {
  console.log(comment);

  return (
    <div className="relative mt-5 flex flex-col gap-4 rounded-lg border border-muted p-8 shadow-md ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={"/images/noavatar.png"}
            height={35}
            width={35}
            alt="avatar"
          />
          <span className="text-sm font-semibold">
            {comment?.userId?.username}
          </span>
        </div>
        <div>
          <span>{format(comment?.createdAt)}</span>
        </div>
      </div>
      <div>
        <p className="leading-8">{comment?.body}</p>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-[2px]">
        {new Array(comment?.rating).fill().map((item, index) => (
          <Star
            key={index}
            strokeWidth={1.1}
            fill="#FFA500"
            color="#FFA500"
            size={19}
          />
        ))}
        {new Array(5 - comment?.rating).fill().map((item, index) => (
          <Star key={index} strokeWidth={1.1} color="#FFA500" size={19} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
