import CircularLoader from '../CircularLoder';
import StripeCardComp from '../StripeCardComp';
import StripeCard from '../wallet/StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const StripeModal = ({
  loader,
  show,
  onCancel,
  onConfirm,
  title,
  confirmText,
  cancelText,
  StripeKey,
  addCreditModal,
  handlePurchaseCard,
  updateCard

}) => {
  const stripe = loadStripe(`${StripeKey}`);

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
 

      <div className="modal-container relative bg-white w-11/12 md:max-w-[40%] mx-auto rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <span
          className="absolute cursor-pointer !leading-[0] right-[10px] top-[20px]  text-[40px]"
          onClick={onCancel}
        >
          &times;
        </span>
        <div className="modal-content py-4  px-6">
          <div className="modal-header">
            <h3 className="text-[29px] text-center leading-[1.4] w-full max-w-[418px] mx-auto text-[#001a5f] font-semibold">
              {title}
            </h3>
          </div>
          <div className="modal-body mt-[12px]">
          {loader && (
          <div className="flex items-center justify-center">
            <div className="absolute inset-0 bg-white opacity-50 z-40"></div>
            <div className="z-50">
              <CircularLoader color="#ef6e6e" />
            </div>
          </div>
        )}
          <Elements stripe={stripe}>
            <StripeCard updateCard={updateCard} handlePurchaseCard={handlePurchaseCard} addCreditModal={addCreditModal}/>
          </Elements>
           
            <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold"></p>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]">
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;
