import React from "react";
import { getDisplayFields, cleanMusic, fetchMusic } from "../../music";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import Loading from "../Loading/loading";
import Error from "../Error/error";
import PlaylistSidebar from "../PlaylistSidebar/playlistSidebar";

class MusicLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      playlists: [],
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

  addMusic(music, name = "All") {
    this.setState({
      playlists: [...this.state.playlists, { name, music: cleanMusic(music) }],
    });
  }

  hasMusic() {
    return this.state.playlists.length > 0;
  }

  render() {
    const { error, playlists } = this.state;

    return (
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {error && <Error message={error} />}
        {this.hasMusic() && (
          <>
            <div className="flex overflow-hidden bg-white">
              <PlaylistSidebar playlists={playlists} />
              <MusicDisplay
                music={playlists[0].music}
                fields={getDisplayFields()}
              />
            </div>
          </>
        )}
        {!error && !this.hasMusic() && (
          <Loading message={"Loading music library"} />
        )}
      </div>
    );
  }
}

export default MusicLibrary;
