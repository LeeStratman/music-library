import axios from "axios";

export const fields = [
  { key: "id", name: "Release Date", display: false },
  { key: "title", name: "Title", display: true },
  { key: "album", name: "Album", display: true },
  { key: "artist", name: "Artist", display: true },
  { key: "genre", name: "Genre", display: true },
  { key: "releaseDate", name: "Release Date", display: true },
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

function filterValidKeys(keys) {
  return getExpectedKeys().filter((key) => keys.includes(key));
}

export function cleanMusic(music) {
  return music.map((song) => cleanSong(song));
}

function cleanSong(song) {
  let receivedKeys = Object.keys(song);
  let validKeys = filterValidKeys(receivedKeys);
  return validKeys.reduce((accumulator, key) => {
    accumulator[key] = song[key];
    return accumulator;
  }, {});
}
