import {FaArrowLeft} from 'react-icons/fa';
const DynamicButton = ({
  className,
  text,
  onClickFunction,
  disabled,
  type,
  backArrow,
}) => {
  return (
    <>
      <button
        onClick={onClickFunction}
        disabled={disabled}
        type={type}
        className={`text-white font-bold py-2 px-4 flex items-center justify-center gap-[6px] tracking-[1px] focus:outline-none focus:shadow-outline whitespace-nowrap  ${className}`}
      >
        {backArrow && <FaArrowLeft />}
        {text}
      </button>
    </>
  );
};

export default DynamicButton;
