import axios from "axios";

class MusicAPI {
  constructor() {
    this.url = "http://www.devcodecampmusiclibrary.com/";
    this.endPoint = "api/music";
    this.fields = [
      { key: "id", name: "Release Date", display: false },
      { key: "title", name: "Title", display: true },
      { key: "album", name: "Album", display: true },
      { key: "artist", name: "Artist", display: true },
      { key: "genre", name: "Genre", display: true },
      { key: "releaseDate", name: "Release Date", display: true },
    ];
  }

  get() {
    return axios.get(`${this.url}${this.endPoint}`);
  }

  getFieldsProperty(key) {
    return this.fields.map((field) => field[key]);
  }

  getExpectedKeys() {
    return this.getFieldsProperty("key");
  }

  filterValidKeys(keys) {
    return this.getExpectedKeys().filter((key) => keys.includes(key));
  }

  clean(music) {
    return music.map((song) => this.cleanSong(song));
  }

  cleanSong(song) {
    let receivedKeys = Object.keys(song);
    let validKeys = this.filterValidKeys(receivedKeys);
    return validKeys.reduce((accumulator, key) => {
      accumulator[key] = song[key];
      return accumulator;
    }, {});
  }
}
const music = new MusicAPI();
export default music;
