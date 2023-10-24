
const ConfirmationModal = ({ show, onCancel, onConfirm, title, message, confirmText, cancelText }) => {
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      
      <div className="modal-container bg-white w-11/12 md:max-w-[500px] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <div className="modal-content py-4  px-6">
          <div className="modal-header">
            <h3 
            className="text-[29px] text-center leading-[1.4] text-[#001a5f] font-semibold">
              {title}
            </h3>
          </div>
          <div className="modal-body">
            <p
            className="text-[29px] text-center leading-[1.4] text-[#001a5f] font-semibold"
            >{message}</p>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]">
            <button
              onClick={onConfirm}
              className="bg-red-500 uppercase tracking-[1.2px] w-full h-[48px] max-w-[175px] text-center hover:bg-red-600 text-white font-semibold py-2 px-4 "
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 uppercase tracking-[1.2px] w-full h-[48px] max-w-[175px] text-center hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
