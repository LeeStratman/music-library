import React from "react";

const DeleteSongForm = ({ song, action }) => {
  return (
    <>
      <div className="sm:flex sm:items-start mb-10">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="form-headline"
          >
            Delete Song
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {`Are you sure you want to delete the following song from your library?`}
            </p>
          </div>
          <div className="mt-2">
            <p>{song.title}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex">
        <button
          onClick={() => {
            action(song);
          }}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          {`Delete`}
        </button>
      </div>
    </>
  );
};

export default DeleteSongForm;
