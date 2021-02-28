import React, { useState } from "react";

const useInput = (initialValue, label, placeholder = "", id) => {
  const [value, setValue] = useState(initialValue);
  const Element = () => {
    return (
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label htmlFor={id} className="label__basic">
          {label}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="text"
            name={id}
            id={id}
            placeholder={placeholder}
            className="input__basic"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    );
  };
  return [value, Element, setValue];
};

export default useInput;
