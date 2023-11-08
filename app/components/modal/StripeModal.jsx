import StripeCardComp from '../StripeCardComp';
import StripeCard from '../wallet/StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const StripeModal = ({
  show,
  onCancel,
  onConfirm,
  title,
  confirmText,
  cancelText,
  StripeKey,
  addCreditModal,
  handlePurchaseCard
}) => {
  const stripe = loadStripe(`${StripeKey}`);

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container relative bg-white w-11/12 md:max-w-[60%] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <span
          className="absolute cursor-pointer !leading-[0] right-[10px] top-[20px]  text-[40px]"
          onClick={onCancel}
        >
          &times;
        </span>
        <div className="modal-content py-4  px-6">
          <div className="modal-header">
            <h3 className="text-[29px] text-center leading-[1.4] text-[#001a5f] font-semibold">
              {title}
            </h3>
          </div>
          <div className="modal-body mt-[12px]">
          <Elements stripe={stripe}>
            <StripeCard handlePurchaseCard={handlePurchaseCard}/>
          </Elements>
           
            <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold"></p>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]">
            {/* <button
              onClick={onConfirm}
              className="bg-red-500 uppercase whitespace-nowrap text-[12px] w-full min-h-[48px] min-w-[175px] max-w-[400px]  text-center hover:bg-red-600 text-white font-semibold py-2 px-4 "
            >
              {confirmText}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;
