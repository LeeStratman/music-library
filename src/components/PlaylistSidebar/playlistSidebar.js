import React from "react";
import AddPlaylistForm from "../AddPlaylistForm/addPlaylistForm";

const PlaylistSidebar = ({
  playlists,
  addPlaylist,
  deletePlaylist,
  showPlaylist,
}) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-100">
      <div className="flex-1 flex flex-col px-2 py-5 bg-indigo-600 overflow-y-auto">
        <h2 className="text-white group flex items-center px-2 py-2 text-lg font-medium rounded-md">
          Playlists
        </h2>
        <ul className="space-y-1 list-none" aria-label="Sidebar">
          {playlists.map((playlist) => (
            <div className="flex justify-between">
              <li
                key={playlist.id}
                className="text-indigo-300 hover:bg-indigo-700 hover:text-white group flex flex-1 items-center px-2 py-2 text-sm font-medium rounded-md"
                onClick={() => showPlaylist(playlist.id)}
              >
                {playlist.name}
                <span className="bg-indigo-900 group-hover:bg-indigo-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                  {playlist.length}
                </span>
              </li>
              {playlist.id !== 1 && (
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
              )}
            </div>
          ))}
        </ul>
        <AddPlaylistForm playlists={playlists} addPlaylist={addPlaylist} />
      </div>
    </div>
  );
};

export default PlaylistSidebar;
