import { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const disapproveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/disapprove-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
        setIsModalOpen(false); // Close modal after successful deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="border-y border-gray-300">
        <td className="px-6 py-4">
          <b className="font-medium text-gray-600">Blog</b> :{" "}
          {blog?.title ?? "Blog not found"}
          <br />
          <br />
          <b className="font-medium text-gray-600">Name</b> : {name}
          <br />
          <b className="font-medium text-gray-600">Comment</b> : {content}
        </td>
        <td className="px-6 py-4 max-sm:hidden">
          {BlogDate.toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          <div className="inline-flex items-center gap-4">
            {!comment.isApproved ? (
              <img
                onClick={approveComment}
                src={assets.tick_icon}
                alt="Approve"
                className="w-5 hover:scale-110 transition-all cursor-pointer"
              />
            ) : (
              <img
                onClick={disapproveComment}
                src={assets.disapprove_icon}
                alt="Disapprove"
                className="w-5 hover:scale-110 transition-all cursor-pointer"
              />
            )}

            <img
              onClick={openModal}
              src={assets.bin_icon}
              alt="Delete"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              data-tooltip-id="action-tooltip"
              data-tooltip-content="Delete Comment"
            />
          </div>
        </td>
      </tr>

      {/* Render the DeleteConfirmationModal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        blogTitle={`${name}'s comment on "${blog?.title ?? "Unknown Blog"}"`}
      />
    </>
  );
};

export default CommentTableItem;
