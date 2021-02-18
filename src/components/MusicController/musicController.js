import React from "react";
import axios from "axios";
import MusicTable from "../MusicTable/musicTable";
import Loading from "../Loading/loading";

class MusicController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isReady: false,
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
      });
  }

  render() {
    return this.state.isReady ? (
      <MusicTable data={this.state.data} />
    ) : (
      <Loading />
    );
  }
}

export default MusicController;
