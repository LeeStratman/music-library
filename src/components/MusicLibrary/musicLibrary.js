import React from "react";
import { getDisplayFields, cleanMusic, fetchMusic } from "../../music";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import Error from "../Error/error";
import PlaylistSidebar from "../PlaylistSidebar/playlistSidebar";
import Modal from "../Modal/modal";
import AddToPlaylistModal from "../AddToPlaylistModal/addToPlaylistModal";

class MusicLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
      error: false,
      playlists: [
        { id: 1, name: "All" },
        { id: 2, name: "Favorites" },
      ],
      activePlaylist: 1,
      activeModal: null,
      activeSong: null,
    };

    this.songOptions = [
      {
        id: 1,
        name: "Add to playlist",
        action: this.songActionHandler.bind(this),
        callback: this.addSongToPlaylist.bind(this),
      },
      {
        id: 2,
        name: "Remove from playlist",
        action: this.songActionHandler.bind(this),
      },
      { id: 3, name: "Update", action: this.songActionHandler.bind(this) },
      { id: 4, name: "Delete", action: this.songActionHandler.bind(this) },
    ];

    this.handleAddPlaylistForm = this.handleAddPlaylistForm.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.getPlaylistLength = this.getPlaylistLength.bind(this);
    this.setActivePlaylist = this.setActivePlaylist.bind(this);
    this.setActiveModal = this.setActiveModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  songActionHandler(actionId, songId) {
    this.setState({
      activeModal: actionId,
      activeSong: songId,
    });
  }

  addSongToPlaylist(playlistId) {
    this.setState({
      music: this.state.music.map((musicSong) => {
        if (musicSong.id === this.state.activeSong) {
          musicSong.playlists.push(Number(playlistId));
        }
        return musicSong;
      }),
      activeSong: null,
      activeModal: null,
    });
  }

  removeSongFromActivePlaylist(song) {
    this.setState({
      music: this.state.music.map((musicSong) => {
        if (musicSong.id === song.id) {
          musicSong.playlists.filter(
            (list) => list !== this.state.activePlaylist
          );
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

  getSongAction() {
    switch (this.state.activeModal) {
      case 1:
        return (
          <AddToPlaylistModal
            song={this.state.activeSong}
            playlists={this.state.playlists}
            callback={this.getCallback(this.state.activeModal)}
          />
        );
      default:
        return <Error message="No modal found" />;
    }
  }

  getCallback(id) {
    return this.songOptions.find((option) => option.id === id).callback;
  }

  closeModal() {
    this.setState({
      activeModal: false,
    });
  }

  setActiveModal(id) {
    this.setState({
      activeModal: id,
    });
  }

  render() {
    const { error, playlists, activePlaylist, activeModal } = this.state;

    return (
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {error ? (
          <Error message={error} />
        ) : (
          <>
            <div className="flex overflow-hidden bg-white">
              <Modal active={activeModal} close={this.closeModal}>
                {this.getSongAction(activeModal)}
              </Modal>
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
                options={this.songOptions}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MusicLibrary;
