import {FaArrowLeft} from 'react-icons/fa';
import {AiOutlineLogout} from 'react-icons/ai';
const DynamicButton = ({
  className,
  text,
  onClickFunction,
  disabled,
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
        style={style}
        className={`text-white font-bold py-2 px-4 flex items-center justify-center gap-[6px] bg-#001a5f-500 transition-all duration-300 ${
          onHoverColorEnabled && 'hover:bg-sky-700 transition-delay-5000'
        } tracking-[1px] focus:outline-none focus:shadow-outline whitespace-nowrap  ${className}`}
      >
        {backArrow && <FaArrowLeft />}
        {logoutIcon && <AiOutlineLogout />}
        {text}
      </button>
    </>
  );
};

export default DynamicButton;
