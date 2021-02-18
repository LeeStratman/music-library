import React from "react";
import axios from "axios";
import MusicTable from "../MusicTable/musicTable";
import Loading from "../Loading/loading";
import Error from "../Error/error";

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isReady: false,
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://www.devcodecampmusiclibrary.com/api/music/")
      .then((data) => {
        this.setState({
          data: data.data,
          isReady: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Network Request Failed!",
        });
      });
  }

  render() {
    const { isReady, data, error } = this.state;

    return isReady ? (
      <MusicTable data={data} />
    ) : error ? (
      <Error message={error} />
    ) : (
      <Loading />
    );
  }
}

export default Music;
