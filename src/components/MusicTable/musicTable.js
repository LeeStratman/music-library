import React from "react";
import TableRow from "../TableRow/tableRow";
import Error from "../Error/error";

const MusicTable = ({ music }) => {
  return music.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <td key={"title"}>Title</td>
            <td key={"album"}>Album</td>
            <td key={"artist"}>Artist</td>
            <td key={"genre"}>Genre</td>
            <td key={"releaseDate"}>Release Date</td>
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
