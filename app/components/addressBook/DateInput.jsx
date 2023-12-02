import React, {useState} from 'react';

function DateInput({fieldType, label, value, onChange}) {
  const [formattedDate, setFormattedDate] = useState('');
  const [inputDate, setInputDate] = useState('');

  const maxMonth = 12;
  const [maxDay, setMaxDay] = useState(31);

  const handleDateChange = (event) => {
    const inputValue = event.target.value;

    const sanitizedValue = inputValue.replace(/[^\d]/g, '');

    if (sanitizedValue.length > 8) {
      return;
    }

    setInputDate(sanitizedValue);

    // Format the date as MM/DD/YYYY with slashes immediately after month and date
    let formatted = sanitizedValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

    // Validate the month and day
    const parts = sanitizedValue.match(/^(\d{2})(\d{2})(\d{4})/);
    if (parts) {
      let month = parseInt(parts[1], 10);
      let day = parseInt(parts[2], 10);
      const year = parseInt(parts[3], 10);

      // Limit the month to max values
      month = Math.min(month, maxMonth);

      if (month === 2) {
        // Adjust for February
        const maxDayFebruary =
          year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
        day = Math.min(day, maxDayFebruary);
        setMaxDay(maxDayFebruary);
      } else if ([4, 6, 9, 11].includes(month)) {
        // Months with 30 days
        day = Math.min(day, 30);
        setMaxDay(30);
      } else {
        // All other months
        day = Math.min(day, 31);
        setMaxDay(31);
      }

      formatted = `${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}/${year}`;
    }

    setFormattedDate(formatted);

    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <div>
      <label
        className="block text-gray-700 md:text-sm text-[12px] font-bold mb-2"
        htmlFor="dateinput"
      >
        {label} (MM/DD/YYYY)
      </label>
      <input
        type="text"
        className="appearance-none md:text-sm text-[12px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={formattedDate}
        onChange={handleDateChange}
        placeholder={`(MM/DD/YYYY)`}
        maxLength={8}
      />
    </div>
  );
}

export default DateInput;
