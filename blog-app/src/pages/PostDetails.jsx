import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../util/api";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleDelete = () => {
    API.delete(`/posts/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.error("Delete failed:", err));
  };

  if (!post) return <p>Loading...</p>;

  const isAuthor = post.authorId === currentUserId;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">by {post.author}</p>
      <p className="mb-4">{post.content}</p>

      {isAuthor && (
        <>
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default PostDetail;
