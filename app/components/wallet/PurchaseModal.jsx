import { useStateContext } from "~/context/StateContext";
const PurchaseModal = ({
    show,
    onCancel,
    onConfirm,
    confirmText,
    cancelText,
  }) => {

const {selectedPlan,amount,packageProduct,subscriptionProduct,subscriptionTitle,subscriptionPriceId} = useStateContext()

    return (
      <div
        className={`${
          show ? 'block' : 'hidden'
        } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
      >
        <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
  
        <div className="modal-container bg-white w-11/12 md:max-w-[60%] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
          <div className="modal-content py-4  px-6">
          
          <div className="flex justify-between items-center mt-[10px]  text-[#001a5f]">
          <span className="">Selected Prepaid Package: {selectedPlan} </span>
          <span className="">${parseFloat(amount).toFixed(2) || 0}</span>
        </div>
        <div className="flex justify-between items-center py-[10px] mt-[10px] border-y border-solid border-[#cfcfcf]   text-[#001a5f]">
          <span className="">Total</span>
          <span className="">${parseFloat(amount).toFixed(2)}</span>
          </div>
            <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]">
           
              <button
                onClick={onCancel}
                className="bg-transparent uppercase text-[12px] border border-solid border-[#ef6e6e] text-[#ef6e6e] whitespace-nowrap tracking-normal uppercase w-full min-h-[48px] max-h- max-w-[400px] min-w-[175px] text-center hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500 uppercase whitespace-nowrap text-[12px] w-full min-h-[48px] min-w-[175px] max-w-[400px]  text-center hover:bg-red-600 text-white font-semibold py-2 px-4 "
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
  