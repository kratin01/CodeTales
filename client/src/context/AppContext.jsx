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
  const [user, setUser] = useState(null);
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

  // Fetch user profile when token exists
  const fetchUserProfile = async (authToken) => {
    try {
      const { data } = await axios.get("/api/user/profile");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  // Login function
  const login = async (email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? "/api/admin/login" : "/api/user/login";
      const { data } = await axios.post(endpoint, { email, password });
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        
        // Store user data
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        
        toast.success("Login successful!");
        return { success: true, user: data.user };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const { data } = await axios.post("/api/user/register", userData);
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast.success("Registration successful!");
        return { success: true, user: data.user };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  useEffect(() => {
    fetchBlogs();
    
    // Check for existing token and user data
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          localStorage.removeItem("user");
        }
      }
      
      // Fetch fresh user profile
      fetchUserProfile(storedToken);
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    user,
    setUser,
    blogs,
    setBlogs,
    input,
    setInput,
    login,
    register,
    logout,
    fetchBlogs,
    fetchUserProfile,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
