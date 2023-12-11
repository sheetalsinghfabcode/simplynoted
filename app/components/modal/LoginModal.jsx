import DynamicButton from '../DynamicButton';
import {Link, useNavigate} from '@remix-run/react';

const LoginModal = ({
  show,
  onCancel,
  setLoginModal,
  title,
  confirmText,
  cancelText,
  hasCancelIcon = true,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container relative bg-white w-11/12 md:max-w-[60%] mx-auto rounded sm:mt-[0px] mt-[-410px] shadow-lg z-50 rounded-[10px] overflow-y-auto">
        {hasCancelIcon && (
          <span
            className="absolute cursor-pointer !leading-[0] right-[10px] top-[20px]  text-[40px]"
            onClick={onCancel}
          >
            &times;
          </span>
        )}
        <div className="modal-content py-4  px-6">
          <div className="modal-header">
            <h3 className="text-[29px] text-center leading-[1.4] text-[#001a5f] font-semibold">
              Want to
              <span className="font-beauty text-[40px]"> {title} ?</span>
            </h3>
          </div>
          <div className="modal-body mt-[12px]">
            <h3 className="text-[29px] text-center leading-[1.4] text-[#001a5f] font-semibold">
              Please login first!
            </h3>

            <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold"></p>
          </div>
          <div className="modal-footer w-full flex flex-col justify-center items-center gap-[12px] mt-[20px]">
            <DynamicButton
              text={confirmText}
              onClickFunction={() => {
                navigate('/account/login');
                onCancel()
              }}
              className="text-white bg-[#ef6e6e]"
            />
            <Link to="/account/register">
              <span
                onClick={onCancel}
                className="text-[#001a5f] underline text-[16px]"
              >
                {cancelText}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
