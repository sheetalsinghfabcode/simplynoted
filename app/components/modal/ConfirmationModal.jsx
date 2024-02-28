const ConfirmationModal = ({
  show,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-[90%] md:max-w-[60%] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <div className="modal-content py-4  px-6">
          <div className="modal-header">
            <h3 className=" md:text-[40px] text-[28px] mb-[12px]  text-center leading-[1.4] w-full mx-auto text-[#001a5f] font-semibold">
              {title}
            </h3>
          </div>
          <div className="modal-body mt-[12px]">
            <p className="md:text-[20px] text-[12px] w-full max-w-[600px]  mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold">
              {message}
            </p>
          </div>
          <div className="modal-footer w-full  md:flex grid md:justify-center  justify-normal mb-[12px] items-center  gap-[12px] mt-[20px]">
            <button
              onClick={onConfirm}
              className="bg-red-500 uppercase whitespace-nowrap text-[12px] w-full min-h-[48px] min-w-[175px] md:max-w-[400px]   text-center transition duration-400 hover:bg-[#001a5f] text-white font-semibold py-2 px-4 "
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="bg-[#001a5f] uppercase text-[12px]   text-white whitespace-nowrap tracking-normal uppercase w-full min-h-[48px]  md:max-w-[400px]  min-w-[175px] text-center transition duration-400 hover:bg-red-500 text-gray-800 font-semibold py-2 px-4"
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
