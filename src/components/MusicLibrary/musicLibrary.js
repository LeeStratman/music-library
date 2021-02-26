import React from "react";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import PlaylistSidebar from "../PlaylistSidebar/playlistSidebar";
import Modal from "../Modal/modal";
import AddToPlaylistModal from "../AddToPlaylistModal/addToPlaylistModal";
import {
  getPlaylistLengthFromMusic,
  getPlaylistSongsFromMusic,
  playlistReducer,
} from "../../utils/playlists";
import { musicReducer, fetchMusic, getDisplayFields } from "../../utils/music";
import Alert from "../Alert/alert";

class MusicLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
      error: false,
      playlists: [
        { id: 1, name: "All", length: 0 },
        { id: 2, name: "Favorites", length: 0 },
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

    this.addPlaylist = this.addPlaylist.bind(this);
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
          error: error.message,
        });
      });
  }

  musicInit(music) {
    let newMusic = music.reduce(
      (accumulator, song) => {
        return musicReducer(accumulator, { type: "ADD", payload: song });
      },
      [...this.state.music]
    );
    this.setState({
      music: newMusic,
    });
  }

  getPlaylistLength(playlistId) {
    return getPlaylistLengthFromMusic(this.state.music, playlistId);
  }

  getPlaylistSongs(playlistId) {
    return getPlaylistSongsFromMusic(this.state.music, playlistId);
  }

  setActivePlaylist(id) {
    this.setState({
      activePlaylist: id,
    });
  }

  addPlaylist(name) {
    this.setState({
      playlists: playlistReducer(this.state.playlists, {
        type: "ADD",
        payload: name,
      }),
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

  deletePlaylist(playlistId) {
    let playlists = playlistReducer(this.state.playlists, {
      type: "DELETE",
      payload: playlistId,
    });

    let music = this.state.music.map((song) => {
      song.playlists = song.playlists.filter((list) => list !== playlistId);
      return song;
    });

    this.setState({
      music,
      playlists,
    });
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
        return <Alert title={"Error"} message="No modal found" />;
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
        {error && (
          <div className="my-5">
            <Alert title={"Music Library Failed to Load"} message={error} />
          </div>
        )}
        <div className="flex bg-white">
          <Modal active={activeModal} close={this.closeModal}>
            {this.getSongAction(activeModal)}
          </Modal>
          <PlaylistSidebar
            playlists={playlists}
            length={this.getPlaylistLength}
            addPlaylist={this.addPlaylist}
            deletePlaylist={this.deletePlaylist}
            showPlaylist={this.setActivePlaylist}
          />
          <MusicDisplay
            music={this.getPlaylistSongs(activePlaylist)}
            fields={getDisplayFields()}
            options={this.songOptions}
          />
        </div>
      </div>
    );
  }
}

export default MusicLibrary;
