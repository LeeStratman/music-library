import React from "react";
import { cleanMusic, fetchMusic } from "../../music";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import Loading from "../Loading/loading";
import Error from "../Error/error";

class MusicLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
      error: false,
    };
  }

  componentDidMount() {
    fetchMusic()
      .then((data) => {
        this.addMusic(data.data);
      })
      .catch((error) => {
        this.setState({ error: "Library failed to load." });
      });
  }

  addMusic(music) {
    this.setState({
      music: cleanMusic(music),
    });
  }

  hasMusic() {
    return this.state.music.length > 0;
  }

  render() {
    const { music, error } = this.state;

    return error ? (
      <Error message={error} />
    ) : this.hasMusic() ? (
      <MusicDisplay music={music} />
    ) : (
      <Loading />
    );
  }
}

export default MusicLibrary;
