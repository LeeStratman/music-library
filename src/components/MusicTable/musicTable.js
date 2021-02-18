import React from "react";
import TableRow from "../TableRow/tableRow";

const MusicTable = (props) => {
  return (
    <div className="container table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <td key={1}>Title</td>
            <td key={2}>Album</td>
            <td key={3}>Artist</td>
            <td key={4}>Genre</td>
            <td key={5}>Release Date</td>
          </tr>
        </thead>
        <tbody>
          {props.data.map((music) => {
            return <TableRow key={music.id} data={music} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MusicTable;
