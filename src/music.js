import axios from "axios";

export const fields = [
  { key: "id", name: "Release Date", display: false },
  { key: "title", name: "Title", display: true },
  { key: "album", name: "Album", display: true },
  { key: "artist", name: "Artist", display: true },
  { key: "genre", name: "Genre", display: true },
  { key: "releaseDate", name: "Release Date", display: true },
  { key: "cover", name: "Cover Date", display: true },
];

export function fetchMusic() {
  return axios.get(`http://www.devcodecampmusiclibrary.com/api/music`);
}

function getFieldsProperty(key) {
  return fields.map((field) => field[key]);
}

function getExpectedKeys() {
  return getFieldsProperty("key");
}

export function getDisplayFields() {
  return fields
    .filter((field) => field.display)
    .map((field) => {
      return { name: field.name, key: field.key };
    });
}

export function cleanMusic(music) {
  return music.map((song) => cleanSong(song));
}

function cleanSong(song) {
  return getExpectedKeys().reduce((accumulator, key) => {
    if (song.hasOwnProperty(key)) {
      accumulator[key] = song[key];
    } else {
      accumulator[key] = "-";
    }
    return accumulator;
  }, {});
}
