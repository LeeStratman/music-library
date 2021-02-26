import React, { useState } from "react";

const PlaylistSidebar = ({
  playlists,
  addPlaylist,
  deletePlaylist,
  length,
  showPlaylist,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;

    setPlaylistName(value);
    !validatePlaylist(value) ? setError(true) : setError(false);
  };

  const validatePlaylist = (value) => {
    let duplicate = playlists.filter(
      (list) => list.name.toLowerCase() === value.toLowerCase().trim()
    );

    if (duplicate.length > 0) {
      return false;
    }
    return true;
  };
  return (
    <div className="flex flex-col flex-shrink-0 w-64">
      <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
        <ul
          className="flex-1 px-2 py-5 bg-indigo-600 space-y-1 list-none"
          aria-label="Sidebar"
        >
          <li className="bg-indig-900 text-indigo group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            Playlists
          </li>
          {playlists.map((playlist) => (
            <li
              key={playlist.name}
              className="text-indigo-300 hover:bg-indigo-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              onClick={() => showPlaylist(playlist.id)}
            >
              {playlist.name}
              <span className="bg-indigo-900 group-hover:bg-indigo-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                {length(playlist.id)}
              </span>
              <button
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => deletePlaylist(playlist.id)}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
            </li>
          ))}

          <form onSubmit={addPlaylist}>
            <label
              htmlFor="addPlaylist"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Add playlist
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="addPlaylist"
                  id="addPlaylist"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder="Add playlist"
                  onChange={handleNameChange}
                  value={playlistName}
                />
                {error && <p>error</p>}
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
          </form>
        </ul>
      </div>
    </div>
  );
};

export default PlaylistSidebar;
