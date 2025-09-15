import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { User, FileText, MessageCircle, Edit3 } from "lucide-react";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axios, user } = useAppContext();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/dashboard");
      if (data.success && data.dashboardData) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data.");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.profile?.firstName || user?.username}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your activity on our platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Published Blogs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData?.publishedBlogs || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Edit3 className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Draft Blogs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData?.draftBlogs || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Comments</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData?.userComments || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Profile Status</p>
                <p className="text-lg font-semibold text-green-600">
                  {user?.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Blogs</h2>
          </div>
          <div className="p-6">
            {dashboardData?.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentBlogs.map((blog, index) => (
                  <div key={blog._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{blog.title}</h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Category: {blog.category}</span>
                        <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first blog post.
                </p>
                <div className="mt-6">
                  <a
                    href="/user/blogs/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                  >
                    Create Blog
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/user/blogs/create"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Edit3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Create Blog</h3>
                <p className="text-sm text-gray-500">Write and publish a new blog post</p>
              </div>
            </div>
          </a>

          <a
            href="/user/profile"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
            </div>
          </a>

          <a
            href="/user/blogs"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Blogs</h3>
                <p className="text-sm text-gray-500">View and edit your blog posts</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;