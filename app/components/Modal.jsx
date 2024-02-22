import {IconClose, Link} from '~/components';
import {ImCross} from 'react-icons/im';

export function Modal({children, cancelLink}) {
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40"></div>
      <div className="fixed inset-0 z-50">
        <div className="flex items-center justify-center mx-auto sm:w-full w-[90%] h-[80%] p-4 text-center sm:p-0">
          <div
            className="max-h-[80%] mt-[10rem] w-fit relative flex-1 px-4 pt-5 pb-4 overflow-auto text-left transition-all 
            transform rounded shadow-xl
              my-auto sm:flex-none sm:w-full md:max-w-[40vw] max-w-[447px] sm:p-6 bg-white"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
            }}
            tabIndex={0}
          >
            <div className="absolute top-[52px] right-0  pr-8 sm:block">
              <button
                // to={cancelLink}
                onClick={cancelLink}
                className="transition text-primary hover:text-primary/50"
              >
                 <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-34px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
