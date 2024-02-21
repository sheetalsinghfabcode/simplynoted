import {useStateContext} from '~/context/StateContext';
const PurchaseModal = ({
  show,
  onCancel,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  const {
    selectedPlan,
    amount,
    packageProduct,
    subscriptionProduct,
    subscriptionTitle,
    subscriptionPriceId,
  } = useStateContext();

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-[60%] mx-auto rounded shadow-lg z-50 rounded-[10px]">
        <div className="modal-content py-4  px-6">
          <div className="flex justify-between items-center mt-[10px]  text-[#001a5f]">
            <span className="font-bold">
              Selected Prepaid Package: {selectedPlan}{' '}
            </span>
            <span className="font-bold">
              ${parseFloat(amount).toFixed(2) || 0}
            </span>
          </div>
          <div className="flex justify-between items-center py-[10px] mt-[10px] border-y border-solid border-[#cfcfcf]   text-[#001a5f]">
            <span className="font-bold">Total</span>
            <span className="font-bold">${parseFloat(amount).toFixed(2)}</span>
          </div>
          <div className="modal-footer w-full md:flex grid md:justify-center justify-normal items-center gap-[12px] mt-[20px]">
            <button
              onClick={onCancel}
              className="bg-[#001a5f] uppercase text-[12px] border border-solid text-[#ef6e6e] whitespace-nowrap tracking-normal uppercase w-full min-h-[48px] text-center text-[white] font-semibold py-2 px-4 transition duration-400 hover:bg-red-500 hover:bg-[#001a5f] hover:text-white"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 uppercase whitespace-nowrap text-[12px] w-full min-h-[48px] text-center text-white font-semibold py-2 px-4 transition duration-400 hover:bg-[#001a5f] hover:text-white"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
