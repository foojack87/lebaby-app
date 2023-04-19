function ConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}) {
  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? '' : 'hidden'}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white z-20 rounded-lg shadow-lg p-6 mx-4 relative overflow-hidden w-[20rem]">
          <div className="mb-4 mt-8">
            <h3 className="text-lg font-medium text-white text-center bg-blue-600 absolute inset-0 h-[2.5rem] p-1.5">
              {title}
            </h3>
            <p className="text-gray-700">{message}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => onConfirm()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
