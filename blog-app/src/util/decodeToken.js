import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return null;
  }
};
