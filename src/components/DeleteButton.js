import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <div className="text-lg font-semibold mb-4">Are you sure you want to delete?</div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition font-medium"
            >
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="text-red-400 hover:text-red-300 transition"
    >
      {label}
    </button>
  );
}
