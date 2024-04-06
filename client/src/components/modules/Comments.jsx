import { useState } from "react";
import useSesion from "../../custom/useSession";
import { Link } from "react-router-dom";
import Button from "./Button";
import Textarea from "./TextArea";
import ReactStars from "react-stars";

import Comment from "./Comment";

import { LoaderCircle } from "lucide-react";

import { toast } from "sonner";

const Comments = ({ comments, productId }) => {
  const [loading, setLoading] = useState(false);
  const { session } = useSesion();
  const [rating, setRating] = useState(null);
  const [body, setBody] = useState("");

  const sendHandler = async () => {
    if (!body.trim()) {
      return false;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          body,
          userId: session.data._id,
          productId,
        }),
      });
      if (res.status === 201) {
        toast.success(
          "Your comment has been sent and will be shown after it is approved by the admin.",
        );
        setRating(null);
        setBody("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmedComments = comments?.filter(
    (comment) => comment.confirmedByAdmin,
  );

  return (
    <div className="my-5 rounded-lg border border-muted bg-gray-100 p-7">
      <h2 className="mb-2 text-xl font-bold">Comments</h2>
      {session.status === "authenticated" ? (
        <div className="flex flex-col gap-3">
          <ul className="text-primary flex list-disc flex-col gap-3 p-2">
            <li>
              Dear user, if there is any problem, firstly, the frequently asked
              questions section Read if you did not find an answer to your
              problem from the section Request tickets for support.
            </li>
            <li>
              Type your comment in English. From using vulgar words or Avoid
              being offensive. If viewed, the comment will not be approved.
            </li>
          </ul>
          <div className="flex flex-col gap-4">
            <ReactStars
              count={5}
              size={25}
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-slate-50"
              rows={15}
              placeholder="Your Comment"
            />
            <Button onClick={sendHandler} isDisabled={loading}>
              {loading ? (
                <LoaderCircle
                  className="animate-spin"
                  size={20}
                  strokeWidth={1}
                />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-5 flex flex-col items-center gap-3">
          <h4 className="text-lg font-bold text-orange-600">
            For Sending a Comment you have to be loged in First.
          </h4>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
      {confirmedComments?.length === 0 ? (
        <div className="mt-4 p-4 text-center text-lg font-bold">
          There is no Comment yet
        </div>
      ) : (
        <>
          {confirmedComments?.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
