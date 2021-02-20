import React from "react";

const Filter = (props) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-light">
        <svg width="16" height="16" fill="#ffffff" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>
      <select
        className="form-select form-select-lg"
        value={props.attribute}
        onChange={props.updateAttribute}
      >
        {props.fields.map((field) => {
          return (
            <option key={field.key} value={field.key}>
              {field.name}
            </option>
          );
        })}
      </select>
      <input
        disabled={!props.attribute}
        type="text"
        className="form-control"
        id="basic-url"
        placeholder={`Type to search by ${props.attribute}...`}
        onChange={props.updateSearchTerm}
      />
    </div>
  );
};

export default Filter;
