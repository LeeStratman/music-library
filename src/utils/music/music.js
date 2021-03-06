import axios from "axios";

const baseURL = `http://localhost:5000/api/music`;

export function fetchMusic() {
  return axios.get(baseURL);
}

export function updateSongRequest(song) {
  return axios.put(`${baseURL}/${song.id}`, song);
}

export function deleteSongRequest(songId) {
  return axios.delete(`${baseURL}/${songId}`);
}

export function addSongRequest(song) {
  return axios.post(`${baseURL}`, song);
}

export const fields = [
  { key: "id", name: "Release Date", display: false, default: "" },
  { key: "title", name: "Title", display: true, default: "" },
  { key: "album", name: "Album", display: true, default: "" },
  { key: "artist", name: "Artist", display: true, default: "" },
  { key: "genre", name: "Genre", display: true, default: "" },
  { key: "releaseDate", name: "Release Date", display: true, default: "" },
  { key: "playlists", name: "Playlists", display: false, default: [1] },
];

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

export function cleanSong(song) {
  return getExpectedKeys().reduce((accumulator, field) => {
    if (song.hasOwnProperty(field.key)) {
      accumulator[field.key] = song[field.key];
    } else {
      accumulator[field.key] = field.default;
    }
    return accumulator;
  }, {});
}

export function getSongFromId(music, songId) {
  return music.find((song) => song.id === songId);
}
