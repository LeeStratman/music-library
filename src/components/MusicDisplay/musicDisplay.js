import React, { useState } from "react";
import MusicTable from "../MusicTable/musicTable";
import Filter from "../Filter/filter";

const MusicDisplay = ({ title, music, fields, options }) => {
  const [attribute, setAttribute] = useState(fields[0].key);
  const [searchTerm, setSearchTerm] = useState("");

  const filterMusic = (music) => (attribute) => (searchTerm) =>
    music.filter((song) =>
      song[attribute].toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

  const updateAttribute = (event) => {
    setAttribute(event.target.value);
  };

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const musicList = (music) => {
    if (!attribute || !searchTerm) return music;
    return filterMusic(music)(attribute)(searchTerm);
  };

  return (
    <>
      <div className="flex-grow ml-5">
        <Filter
          title={title}
          fields={fields}
          attribute={attribute}
          updateAttribute={updateAttribute}
          searchTerm={searchTerm}
          updateSearchTerm={updateSearchTerm}
        />
        <MusicTable
          music={musicList(music)}
          fields={fields}
          options={options}
        />
      </div>
    </>
  );
};

export default MusicDisplay;
