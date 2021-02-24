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
      playlists: [{ name: "All", music: [] }],
    };

    this.handleAddPlaylistForm = this.handleAddPlaylistForm.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
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
    let defaultList = this.state.playlists.find((list) => list.name === "All");
    defaultList.music = [...defaultList.music, ...music];
    this.setState({
      playlists: [
        ...this.state.playlists.filter((list) => list.name !== "All"),
        defaultList,
      ],
    });
  }

  addPlaylist(name) {
    this.setState({
      playlists: [...this.state.playlists, { name, music: [] }],
    });
  }

  deletePlaylist(name) {
    this.setState({
      playlists: [...this.state.playlists.filter((list) => list.name !== name)],
    });
  }

  handleAddPlaylistForm(event) {
    event.preventDefault();
    let name = event.target.elements.addPlaylist.value;
    this.addPlaylist(name);
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
              <PlaylistSidebar
                playlists={playlists}
                addPlaylist={this.handleAddPlaylistForm}
                deletePlaylist={this.deletePlaylist}
              />
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
