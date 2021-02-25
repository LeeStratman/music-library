import React from "react";
import { getDisplayFields, cleanMusic, fetchMusic } from "../../music";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import Error from "../Error/error";
import PlaylistSidebar from "../PlaylistSidebar/playlistSidebar";

class MusicLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
      error: false,
      playlists: [{ id: 1, name: "All" }],
      activePlaylist: 1,
    };

    this.handleAddPlaylistForm = this.handleAddPlaylistForm.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.getPlaylistLength = this.getPlaylistLength.bind(this);
    this.setActivePlaylist = this.setActivePlaylist.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount() {
    fetchMusic()
      .then((data) => {
        this.musicInit(data.data);
      })
      .catch((error) => {
        this.setState({
          error: `Library failed with following error: ${error.message}`,
        });
      });
  }

  musicInit(music) {
    this.setState({
      music: [
        ...cleanMusic(music).map((song) => {
          song.playlists = [1];
          return song;
        }),
      ],
    });
  }

  getPlaylistLength(id) {
    return this.getPlaylistSongs(id).length;
  }

  getPlaylistSongs(id) {
    return this.state.music.filter((song) => song.playlists.includes(id));
  }

  setActivePlaylist(id) {
    this.setState({
      activePlaylist: id,
    });
  }

  addPlaylist(name) {
    this.setState({
      playlists: [
        ...this.state.playlists,
        { name, id: this.state.playlists.length + 1 },
      ],
    });
  }

  getSongById(id) {
    return this.state.music.find((song) => song.id === id);
  }

  addSongToPlaylist(playlistID, song) {
    this.setState({
      music: this.state.music.map((musicSong) => {
        if (musicSong.id === song.id) {
          musicSong.playlists.push(playlistID);
        }
        return musicSong;
      }),
    });
  }

  removeSongFromPlaylist(playlistID, song) {
    this.setState({
      music: this.state.music.map((musicSong) => {
        if (musicSong.id === song.id) {
          musicSong.playlists.filter((list) => list !== playlistID);
        }
        return musicSong;
      }),
    });
  }

  deletePlaylist(id) {
    let playlists = this.state.playlists.filter((list) => list.id !== id);
    let music = this.state.music.map((song) => {
      song.playlists = song.playlists.filter((list) => list !== id);
      return song;
    });

    this.setState({
      music,
      playlists,
    });
  }

  handleAddPlaylistForm(event) {
    event.preventDefault();
    let name = event.target.elements.addPlaylist.value;
    this.addPlaylist(name);
  }

  openModal(optionID, data) {
    // TODO: open modal.
  }

  render() {
    const { error, playlists, activePlaylist } = this.state;

    return (
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {error ? (
          <Error message={error} />
        ) : (
          <>
            <div className="flex overflow-hidden bg-white">
              <PlaylistSidebar
                playlists={playlists}
                length={this.getPlaylistLength}
                addPlaylist={this.handleAddPlaylistForm}
                deletePlaylist={this.deletePlaylist}
                showPlaylist={this.setActivePlaylist}
              />
              <MusicDisplay
                music={this.getPlaylistSongs(activePlaylist)}
                fields={getDisplayFields()}
                options={[
                  {
                    id: 1,
                    name: "Add to playlist",
                    action: this.addSongToPlaylist,
                  },
                  {
                    id: 2,
                    name: "Remove from playlist",
                    action: this.removeFromPlaylist,
                  },
                  { id: 3, name: "Update", action: this.updateSong },
                  { id: 4, name: "Delete", action: this.deleteSong },
                ]}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MusicLibrary;
