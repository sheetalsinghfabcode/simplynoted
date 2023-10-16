import React, { useState } from 'react';

function Checkbox({ items, onCheckboxChange }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemId) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[itemId] = !checkedItems[itemId];
    setCheckedItems(updatedCheckedItems);
    onCheckboxChange(updatedCheckedItems);
  };

  return (
    <div>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            checked={checkedItems[item.id] || false}
            onChange={() => handleCheckboxChange(item.id)}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}

export default Checkbox;