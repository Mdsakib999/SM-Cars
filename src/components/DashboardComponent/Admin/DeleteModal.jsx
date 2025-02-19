import React from "react";

const DeleteModal = ({ onDelete, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete this subscription plan?</p>
      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
