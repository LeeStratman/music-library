import React from "react";

const PlaylistSidebar = ({ playlists }) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-64">
      <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
        <ul
          className="flex-1 px-2 bg-indigo-600 space-y-1 list-none"
          aria-label="Sidebar"
        >
          <li className="bg-indig-900 text-indigo group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            Playlists
          </li>
          {playlists.map((playlist) => (
            <li className="text-indigo-300 hover:bg-indigo-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              {playlist.name}
              <span className="bg-indigo-900 group-hover:bg-indigo-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                {playlist.music.length}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistSidebar;
