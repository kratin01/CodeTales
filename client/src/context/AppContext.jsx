// client\src\context\AppContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  //This will fetch all blogs from the API on the initial render and store in setBlogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success
        ? setBlogs(data.blogs)
        : toast.error(data.error + "Failed to fetch blogs");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
    //now we have to check the token so we can protect the admin routes
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role || null);
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (!token) return;
        const { data } = await axios.get('/api/auth/me');
        if (data.success) setCurrentUser(data.user);
      } catch (_) {}
    };
    fetchMe();
  }, [token]);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    role,
    setRole,
    currentUser,
    setCurrentUser,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
