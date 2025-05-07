import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../util/api";
import { decodeToken } from "../util/decodeToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
   const loadUser = () => {
      const decoded = decodeToken();
      setUser(decoded);
    };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          navigate("/"); // Already logged in
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    API.post("/auth/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed", err);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full mb-4 p-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full mb-4 p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
