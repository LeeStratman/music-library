import React from "react";
import TableRow from "../TableRow/tableRow";
import Error from "../Error/error";

const MusicTable = ({ music, fields }) => {
  return music.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {fields.map((field) => {
              return <td key={field.key}>{field.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {music.map((song) => {
            return <TableRow key={song.id} data={song} fields={fields} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <Error message="No music found." />
  );
};

export default MusicTable;
