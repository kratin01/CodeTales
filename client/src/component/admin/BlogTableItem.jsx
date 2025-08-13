import { useState } from 'react';
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteBlog = async () => {
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    await deleteBlog();
  };

  return (
    <>
      <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
          <p
            className={`${
              isPublished ? "text-green-600" : "text-orange-700"
            }`}
          >
            {isPublished ? "Published" : "Unpublished"}
          </p>
        </td>
        <td className="px-2 py-4 flex items-center text-xs gap-3">
          <button
            onClick={togglePublish}
            className="border px-2 py-0.5 rounded cursor-pointer"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <img
            src={assets.disapprove_icon}
            onClick={handleDeleteClick}
            className="w-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
            alt="Delete Blog"
          />
        </td>
      </tr>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        blogTitle={title}
      />
    </>
  );
};

export default BlogTableItem;