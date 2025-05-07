import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../util/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="p-4 border rounded mb-3">
          <Link to={`/post/${post._id}`}> <h2 className="text-xl font-semibold">{post.title}</h2> </Link>
          <p className="text-gray-600">by {post.author}</p>
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;