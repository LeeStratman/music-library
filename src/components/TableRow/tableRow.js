import React from "react";

const TableRow = (props) => {
  const { data } = props;
  return (
    <tr>
      <td key={1}>{data.title}</td>
      <td key={2}>{data.album}</td>
      <td key={3}>{data.artist}</td>
      <td key={4}>{data.genre}</td>
      <td key={5}>{data.releaseDate}</td>
    </tr>
  );
};

export default TableRow;
