import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Blog</Link>

      <div className="relative">
        {!user ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/create" className="bg-blue-700 px-3 py-1 rounded">Create</Link>
            <div className="relative inline-block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-blue-700 px-3 py-1 rounded"
              >
                {user.name}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
