// ErrorModal.js
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '40%', // Add your desired width here
    // height:'100%',
    maxHeight:'70vh'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

const ErrorModal = ({isOpen, onRequestClose, title, content}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Error Modal"
      style={customStyles}
      // shouldCloseOnOverlayClick={false}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        <div>
        <h2 className="text-center uppercase text-[20px] text-red-900">
          {title}
        </h2>
        <ul>
          {content.map((errorMessage, index) => (
            <li className="text-center text-black text-[16px]" key={index}>
              {errorMessage}
            </li>
          ))}
        </ul>
        </div>

        
      </div>
    </Modal>
  );
};

export default ErrorModal;
