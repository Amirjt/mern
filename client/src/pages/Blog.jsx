import { useEffect, useState } from "react";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";
import SinglePost from "../components/modules/SinglePost";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-3 grid grid-cols-1 gap-4 p-3 lg:grid-cols-4">
        {posts.map((post) => (
          <SinglePost post={post} key={post._id} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
