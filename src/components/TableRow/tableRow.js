import React from "react";

const TableRow = ({ data, fields }) => {
  return (
    <tr>
      {fields.map((field) => {
        return <td key={field.key}>{data[field.key]}</td>;
      })}
    </tr>
  );
};

export default TableRow;
