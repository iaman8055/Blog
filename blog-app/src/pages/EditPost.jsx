import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../util/api";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    API.put(`/posts/${id}`, { title, content }).then(() => navigate(`/post/${id}`));
  };

  return (
    <form onSubmit={handleUpdate} className="p-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full mb-4 p-2 border" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="block w-full mb-4 p-2 border"></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Update Post</button>
    </form>
  );
};

export default EditPost;
