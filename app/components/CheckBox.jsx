const Checkbox = ({label, checked, onChange, value}) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
