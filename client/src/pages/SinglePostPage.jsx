import { useParams } from "react-router-dom";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";
import { useEffect, useState } from "react";

import { format } from "timeago.js";
import DOMpurify from "dompurify";

const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog/${params.postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [params.postId]);

  return (
    <>
      <Header />
      <div
        data-aos="fade-up-left"
        className="m-5 mt-7 rounded-lg border border-muted p-4 shadow-lg sm:mx-auto sm:w-1/2"
      >
        <div className="flex flex-col gap-4">
          <img src={post?.image} alt="" className="rounded-lg" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/images/noavatar.png" width={30} alt="" />
              <span className="text-sm font-semibold">
                {post?.user.username}
              </span>
            </div>
            <div>
              <div>
                <span className="text-muted-foreground text-sm">
                  {format(post?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-justify text-xl font-bold leading-8">
              {post?.title}
            </h2>
          </div>
          <div
            className="text-sm leading-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(post?.body) }}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePostPage;
