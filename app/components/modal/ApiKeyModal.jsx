import Modal from 'react-modal';
import {ImCross} from 'react-icons/im';
import {useRef, useState} from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    // width: '100%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%', // Add your desired width here
    maxHeight: '70vh',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '50',
  },
};

function ApiKeyModal({
  isOpen,
  closeModal,
  title,
  close = false,
  button = false,
  onClick,
  image,
  body,
}) {
  const textRef = useRef(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    if (textRef.current) {
      navigator.clipboard
        .writeText(textRef.current.innerText)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 1000); // Reset copy success after 1 second
        })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="CSV Instruction Modal"
      ariaHideApp={false}
    >
      <div className="">
        <div className="relative">
          {close && (
            <div className="absolute top-[35px] right-[1px] top-[36px] sm:block">
              <span onClick={closeModal} className="transition text-primary ">
                <ImCross className="md:mr-[-12px] cursor-pointer mr-[-16px] mt-[-51px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
              </span>
            </div>
          )}
          {image && (
            <div className="flex justify-center">
              <img
                className="w-[15%]"
                src="https://100dayscss.com/codepen/alert.png"
              />
            </div>
          )}
          {title && (
            <h2 className="text-[#001a5f] font-bold sm:text-3xl text-2xl text-center p-[15px]">
              {title}
            </h2>
          )}
          <div className="flex justify-center">
            {button && (
              <button
                type="button"
                onClick={closeModal}
                className="bg-[#ef6e6e] text-white font-bold py-2 px-4 h-[45px] focus:outline-none focus:shadow-outline"
                style={{width: '100%'}}
              >
                Close
              </button>
            )}
          </div>
          <div
            ref={textRef}
            className={`w-full break-all ${
              copySuccess ? ' bg-blue-500 text-white' : ''
            }`}
          >
            {body}
          </div>

          <div className="flex mt-[8px] md:mt-[16px] justify-center">
            <button
              onClick={copyToClipboard}
              className="bg-red-500  uppercase whitespace-nowrap text-[12px] w-full min-h-[40px]  md:max-w-[240px]   text-center transition duration-400 hover:bg-[#001a5f] text-white font-semibold py-2 px-4 "
            >
              {copySuccess ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ApiKeyModal;
