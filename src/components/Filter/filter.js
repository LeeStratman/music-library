import React from "react";

const Filter = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="filter"
        className="sr-only block text-sm font-medium text-gray-700"
      >
        Filter Music
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
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
        </div>
        <input
          type="text"
          name="filter"
          id="filter"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
          placeholder={`Type to filter by ${props.attribute}...`}
          onChange={props.updateSearchTerm}
          disabled={!props.attribute}
        />
      </div>
    </div>
  );
};

export default Filter;
