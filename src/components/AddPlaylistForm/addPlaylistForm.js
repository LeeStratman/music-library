import React, { useState } from "react";
import { playlistExists } from "../../utils/playlists/playlists";

const AddPlaylistForm = ({ playlists, addPlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState(false);

  const errorClass = error
    ? "focus:border-red-500 border-red-500"
    : "focus:border-indigo-500  border-indigo-300";

  const handleNameChange = (event) => {
    const { value } = event.target;
    setPlaylistName(value);
    !playlistExists(playlists, value) ? setError(true) : setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let name = event.target.elements.addPlaylist.value;
    addPlaylist(name);
    setPlaylistName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="addPlaylist"
        className="block text-sm font-medium text-gray-700 sr-only"
      >
        Add playlist
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name="addPlaylist"
            id="addPlaylist"
            className={`focus:ring-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm ${errorClass}`}
            placeholder="Add playlist"
            onChange={handleNameChange}
            value={playlistName}
          />
        </div>
        <button
          disabled={error || playlistName.trim() === ""}
          type="submit"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="sr-only">Add</span>
        </button>
      </div>
      {error && (
        <p className="text-indigo-300 text-sm">Error: Name must be unique.</p>
      )}
    </form>
  );
};

export default AddPlaylistForm;
