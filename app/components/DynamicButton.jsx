import {FaArrowLeft ,FaArrowRight} from 'react-icons/fa';
import {AiOutlineLogout} from 'react-icons/ai';
const DynamicButton = ({
  className,
  text,
  onClickFunction,
  disabled,
  nextArrow,
  type,
  backArrow,
  logoutIcon,
  style = {},
  onHoverColorEnabled = false,
}) => {
  return (
    <>
      <button
        onClick={onClickFunction}
        disabled={disabled}
        type={type}
        style={{...style, transition: 'all 700ms'}}
        className={`text-white font-bold py-2 px-4 flex items-center justify-center gap-[10px] bg-#001a5f-500 tracking-[-0.2px]  ${
          onHoverColorEnabled ? 'hover:bg-sky-700 ' : ''
        }  focus:outline-none focus:shadow-outline ${className}`}
      >
        {backArrow && <FaArrowLeft />}
        {nextArrow && <FaArrowRight/>}
        {logoutIcon && <AiOutlineLogout />}
        {text}

      </button>
    </>
  );
};

export default DynamicButton;
