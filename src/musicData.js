import axios from "axios";

axios.defaults.baseURL = "http://www.devcodecampmusiclibrary.com/";

export default function getMusic() {
  return axios.get("api/music/");
}
