import React from "react";

const TableRow = ({ data, fields }) => {
  return (
    <tr>
      {fields.map((field) => {
        return (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            key={field.key}
          >
            {data[field.key]}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
