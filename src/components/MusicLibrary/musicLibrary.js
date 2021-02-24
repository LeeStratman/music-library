import React from "react";
import { getDisplayFields, cleanMusic, fetchMusic } from "../../music";
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
        this.setState({
          error: `Library failed with following error: ${error.message}`,
        });
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

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && <Error message={error} />}
        {this.hasMusic() && (
          <MusicDisplay music={music} fields={getDisplayFields()} />
        )}
        {!error && !this.hasMusic() && (
          <Loading message={"Loading music library"} />
        )}
      </div>
    );
  }
}

export default MusicLibrary;
