import React, { useState } from "react";
import MusicTable from "../MusicTable/musicTable";
import Filter from "../Filter/filter";

const MusicDisplay = ({ music }) => {
  const [attribute, setAttribute] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filterMusic = (music) => (attribute) => (searchTerm) =>
    music.filter((song) => song[attribute] === searchTerm);

  const updateAttribute = (event) => {
    setAttribute(event.target.value);
  };

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const musicList = (music) => {
    if (!attribute || !searchTerm) {
      return music;
    }
    return filterMusic(music)(attribute)(searchTerm);
  };

  return (
    <>
      <div className="container">
        <Filter
          attribute={attribute}
          updateAttribute={updateAttribute}
          searchTerm={searchTerm}
          updateSearchTerm={updateSearchTerm}
        />
        <MusicTable data={musicList(music)} />
      </div>
    </>
  );
};

export default MusicDisplay;
