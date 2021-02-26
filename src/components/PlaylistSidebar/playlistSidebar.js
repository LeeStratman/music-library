import React from "react";
import AddPlaylistForm from "../AddPlaylistForm/addPlaylistForm";

const PlaylistSidebar = ({
  playlists,
  addPlaylist,
  deletePlaylist,
  length,
  showPlaylist,
}) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-64">
      <div className="flex-1 flex flex-col px-2 pb-4 bg-indigo-600 overflow-y-auto">
        <ul className="py-5 space-y-1 list-none" aria-label="Sidebar">
          <li className="bg-indig-900 text-indigo group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            Playlists
          </li>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
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
        </ul>
        <AddPlaylistForm playlists={playlists} addPlaylist={addPlaylist} />
      </div>
    </div>
  );
};

export default PlaylistSidebar;
