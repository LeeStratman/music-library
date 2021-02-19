import React from "react";
import TableRow from "../TableRow/tableRow";
import Error from "../Error/error";

const MusicTable = ({ music }) => {
  return music.length > 0 ? (
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
          {music.map((song) => {
            return <TableRow key={song.id} data={song} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <Error message="No music found." />
  );
};

export default MusicTable;
