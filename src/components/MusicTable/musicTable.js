import React from "react";
import Error from "../Error/error";
import FlyoutMenu from "../FlyoutMenu/flyoutMenu";

const MusicTable = ({ music, fields, options }) => {
  return music && music.length > 0 ? (
    <div className="flex flex-col mb-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {fields.map((field) => {
                    return (
                      <th
                        key={field.key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {field.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {music.map((song) => {
                  return (
                    <tr key={song.id}>
                      {fields.map((field) => {
                        return (
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            key={field.key}
                          >
                            {song[field.key]}
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <FlyoutMenu song={song.id} options={options} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Error message="No music found." />
  );
};

export default MusicTable;
