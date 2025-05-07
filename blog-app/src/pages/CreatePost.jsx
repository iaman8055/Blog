import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../util/api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/posts", { title, content })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="block w-full mb-4 p-2 border" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="block w-full mb-4 p-2 border"></textarea>
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Create Post</button>
    </form>
  );
};

export default CreatePost;