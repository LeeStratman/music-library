import React, { useState } from "react";

const UpdateSongForm = ({ song, action }) => {
  const [title, updateTitle] = useState(song.title);
  const [album, updateAlbum] = useState(song.album);
  const [artist, updateArtist] = useState(song.artist);
  const [genre, updateGenre] = useState(song.genre);
  const [releaseDate, updateReleaseDate] = useState(song.releaseDate);
  return (
    <>
      <div className="sm:flex sm:items-start mb-10">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="form-headline"
          >
            Update Song
          </h3>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => updateTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              name="album"
              id="album"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => updateAlbum(e.target.value)}
              value={album}
            />
            <input
              type="text"
              name="artist"
              id="artist"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => updateArtist(e.target.value)}
              value={artist}
            />
            <input
              type="text"
              name="genre"
              id="genre"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => updateGenre(e.target.value)}
              value={genre}
            />
            <input
              type="text"
              name="releaseDate"
              id="releaseDate"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-36 sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => updateReleaseDate(e.target.value)}
              value={releaseDate}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex">
        <button
          onClick={() =>
            action({
              ...song,
              title,
              album,
              artist,
              genre,
              releaseDate,
            })
          }
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateSongForm;
