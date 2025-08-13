import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../component/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import ShimmerUI from "../../component/admin/ShimmerUI/ShimmerUI";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success && data.dashboardData) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch valid dashboard data.");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dashboardData) {
      const retryTimer = setTimeout(() => {
        fetchDashboardData();
      }, 2000); // Retry after 2 seconds

      return () => clearTimeout(retryTimer); // Cleanup timer
    }
  }, [dashboardData]);

  if (loading) {
    return <ShimmerUI />;
  }

  if (!dashboardData) {
    window.location.reload();
  }

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_32} alt="" className="w-9" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_12} alt="" className="w-8" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon22} alt="" className="w-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_42} alt="" className="w-6" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6 w-12 text-center">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboardData}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5">No recent blogs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
