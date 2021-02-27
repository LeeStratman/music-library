import React, { useState } from "react";

const AddSongToPlaylistForm = ({ song, playlists, action }) => {
  const [selectedPlaylist, setPlaylist] = useState("");
  return (
    <>
      <div className="sm:flex sm:items-start mb-10">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="form-headline"
          >
            Add Song to Playlist
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Please select a playlist below:
            </p>
          </div>
          <label htmlFor="playlists" className="sr-only">
            Playlists
          </label>
          <select
            id="playlists"
            name="playlists"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-indigo-300 bg-transparent text-gray-500 sm:text-sm rounded-md"
            value={selectedPlaylist}
            onChange={(event) => setPlaylist(event.target.value)}
          >
            {playlists.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex">
        <button
          onClick={() => action(song.id, selectedPlaylist)}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddSongToPlaylistForm;
