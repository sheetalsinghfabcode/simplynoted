import {IconClose, Link} from '~/components';

export function Modal({children, cancelLink}) {
  // console.log(children,"children");
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
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all 
            transform rounded shadow-xl
              sm:my-12 sm:flex-none sm:w-full md:max-w-[40vw] max-w-[447px] mb-[247px] sm:p-6 bg-white"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
            }}
            tabIndex={0}
          >
            <div className="absolute top-0 right-0  pt-4 pr-4 sm:block">
              <button
                // to={cancelLink}
                onClick={cancelLink}
                className="p-4 -m-4 transition text-primary hover:text-primary/50"
              >
                <IconClose
                  className="md:mr-[-12px] mr-[-16px] mt-[-34px]"
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
