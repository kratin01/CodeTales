

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, blogTitle }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-white/90 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete Blog Post
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{blogTitle}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
