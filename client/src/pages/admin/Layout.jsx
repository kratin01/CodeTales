import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router";
import Sidebar from "../../component/admin/Sidebar"
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-8 border-b border-gray-200">
        <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={assets.logo2}
          alt="logo"
          className="w-12 sm:w-12 object-contain"
        />
        <span className="text-xl sm:text-3xl font-semibold text-primary">CodeTales</span>
      </div>
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
