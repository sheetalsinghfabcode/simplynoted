import {FaArrowLeft} from 'react-icons/fa';
import { AiOutlineLogout } from "react-icons/ai";
const DynamicButton = ({
  className,
  text,
  onClickFunction,
  disabled,
  type,
  backArrow,
  logoutIcon
}) => {
  return (
    <>
      <button
        onClick={onClickFunction}
        disabled={disabled}
        type={type}
        className={`text-white font-bold py-2 px-4 flex items-center lg:ml-[0px] ml-[30px] justify-center gap-[6px] tracking-[1px] focus:outline-none focus:shadow-outline whitespace-nowrap lg:w-[150px] w-[125px]  ${className}`}
      >
        {backArrow && <FaArrowLeft />}
        {logoutIcon && <AiOutlineLogout/>}
        {text}
      </button>
    </>
  );
};

export default DynamicButton;
