import React from "react";
import useInput from "../hooks/useInput";

const UpdateSongForm = ({ song, action }) => {
  const [title, TitleInput] = useInput(
    song.title,
    "Title",
    song.title,
    "title"
  );
  const [album, AlbumInput] = useInput(
    song.album,
    "Album",
    song.album,
    "album"
  );
  const [artist, ArtistInput] = useInput(
    song.artist,
    "Artist",
    song.artist,
    "artist"
  );
  const [genre, GenreInput] = useInput(
    song.genre,
    "Genre",
    song.genre,
    "genre"
  );
  const [releaseDate, ReleaseDateInput] = useInput(
    song.releaseDate,
    "Releasse Date",
    song.releaseDate,
    "releaseDate"
  );

  return (
    <>
      <div className="sm:flex sm:items-start mb-10">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="form-headline"
          >
            Update Song
          </h3>
          <div className="mt-2">
            <TitleInput />
            <AlbumInput />
            <ArtistInput />
            <GenreInput />
            <ReleaseDateInput />
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
