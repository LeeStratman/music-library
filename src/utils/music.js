import axios from "axios";

export const fields = [
  { key: "id", name: "Release Date", display: false, default: "" },
  { key: "title", name: "Title", display: true, default: "" },
  { key: "album", name: "Album", display: true, default: "" },
  { key: "artist", name: "Artist", display: true, default: "" },
  { key: "genre", name: "Genre", display: true, default: "" },
  { key: "releaseDate", name: "Release Date", display: true, default: "" },
  { key: "playlists", name: "Playlists", display: false, default: [1] },
];

export function musicReducer(music, action) {
  switch (action.type) {
    case "ADD":
      return addSong(music, action.payload);
    case "DELETE":
      return deleteSong(music, action.payload);
    default:
      return music;
  }
}

function addSong(music, song) {
  return [...music, cleanSong(song)];
}

function deleteSong(music, songId) {
  return [...music.filter((song) => song.id !== songId)];
}

export function fetchMusic() {
  return axios.get(`http://www.devcodecampmusiclibrary.com/api/music`);
}

function getFieldsProperty(key) {
  return fields.map((field) => {
    return { key: field[key], default: field.default };
  });
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
  return getExpectedKeys().reduce((accumulator, field) => {
    if (song.hasOwnProperty(field.key)) {
      accumulator[field.key] = song[field.key];
    } else {
      accumulator[field.key] = field.default;
    }
    return accumulator;
  }, {});
}
