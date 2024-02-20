import {IconClose, Link} from '~/components';

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
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center mx-auto  sm:w-full w-[90%] min-h-full p-4 text-center sm:p-0">
          <div
            className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all 
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
            <div className="absolute top-[28px] right-0  pr-8 sm:block">
              <button
                // to={cancelLink}
                onClick={cancelLink}
                className="transition text-primary hover:text-primary/50"
              >
                <IconClose
                  className="md:mr-[-12px] mr-[-16px] mt-[-34px] text-white font-extrabold bg-[#EF6E6E]"
                  aria-label="Close panel"
                />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
