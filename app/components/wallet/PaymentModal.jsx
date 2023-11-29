import Accordion from "./Accordian";

const PaymentModal = ({show, onCancel, onConfirm, confirmText, cancelText}) => {
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-[60%] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <div className="modal-content py-4  px-6">
            <Accordion/>
        
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
