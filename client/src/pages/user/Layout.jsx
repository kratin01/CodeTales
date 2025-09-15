import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { User, FileText, Settings, LogOut } from "lucide-react";

const UserLayout = () => {
  const { logout, navigate, user } = useAppContext();

  const navigationItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: User },
    { name: "My Blogs", href: "/user/blogs", icon: FileText },
    { name: "Profile", href: "/user/profile", icon: Settings },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between py-4 h-[70px] px-4 sm:px-8 border-b border-gray-200 bg-white">
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
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.profile?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.profile?.firstName || user?.username}
            </span>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 pt-6">
          <nav className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Icon size={20} />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;