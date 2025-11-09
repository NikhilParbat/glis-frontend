export default function DeleteLandModal({ land, onClose, onConfirm }) {
  if (!land) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-lg text-center">
        <h3 className="text-lg mb-4 text-red-500 font-semibold">
          Confirm Deletion
        </h3>
        <p className="mb-5">
          Are you sure you want to delete <b>{land.landName}</b>?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(land._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
