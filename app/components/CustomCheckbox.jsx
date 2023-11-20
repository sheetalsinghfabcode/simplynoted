export default function CustomCheckbox({label, isChecked, onChange, value}) {
  const hyphenatedLabel = label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label
      htmlFor={`${hyphenatedLabel}`}
      className="flex items-center cursor-pointer text-[#1b5299]"
    >
      <input
        type="checkbox"
        id={`${hyphenatedLabel}`}
        checked={isChecked}
        value={value}
        onChange={onChange}
        className="hidden"
      />
      <div className="w-4 h-4 border border-[#1b5299] flex items-center justify-center">
        {isChecked && (
          <svg
            className="w-4 h-4 text-[#1b5299] fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
      <span className="ml-2 font-semibold text-sm">{label}</span>
    </label>
  );
}
