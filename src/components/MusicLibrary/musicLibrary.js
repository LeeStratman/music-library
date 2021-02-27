import React from "react";
import MusicDisplay from "../MusicDisplay/musicDisplay";
import PlaylistSidebar from "../PlaylistSidebar/playlistSidebar";
import Modal from "../Modal/modal";
import AddSongToPlaylistForm from "../AddSongToPlaylistForm/addSongToPlaylistForm";
import Alert from "../Alert/alert";
import musicReducer from "../../utils/music/musicReducer";
import playlistReducer from "../../utils/playlists/playlistsReducer";
import {
  getPlaylistLengthFromMusic,
  getPlaylistSongsFromMusic,
  getPlaylistFromId,
} from "../../utils/playlists/playlists";
import {
  fetchMusic,
  getDisplayFields,
  cleanMusic,
  getSongFromId,
} from "../../utils/music/music";
import DeleteSongFromPlaylistForm from "../DeleteSongFromPlaylistForm/DeleteSongFromPlaylistForm";

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
        callback: this.deleteSongFromPlaylist.bind(this),
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
    let newMusic = cleanMusic(music).reduce(
      (accumulator, song) => {
        return musicReducer(accumulator, {
          type: "ADD",
          payload: song,
        });
      },
      [...this.state.music]
    );

    this.setState({
      music: newMusic,
      playlists: playlistReducer(this.state.playlists, {
        type: "SET_LENGTH",
        payload: { playlistId: 1, length: newMusic.length },
      }),
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

  songActionHandler(actionId, songId) {
    this.setState({
      activeModal: actionId,
      activeSong: songId,
    });
  }

  addSongToPlaylist(songId, playlistId) {
    this.setState({
      music: musicReducer(this.state.music, {
        type: "ADD_TO_PLAYLIST",
        payload: { songId: songId, playlistId },
      }),
      playlists: playlistReducer(this.state.playlists, {
        type: "ADD_TO_PLAYLIST",
        payload: { playlistId },
      }),
      activeSong: null,
      activeModal: null,
    });
  }

  deleteSongFromPlaylist(songId, playlistId) {
    this.setState({
      music: musicReducer(this.state.music, {
        type: "REMOVE_FROM_PLAYLIST",
        payload: { songId, playlistId },
      }),
      playlists: playlistReducer(this.state.playlists, {
        type: "REMOVE_FROM_PLAYLIST",
        payload: { playlistId },
      }),
      activeSong: null,
      activeModal: null,
    });
  }

  deletePlaylist(playlistId) {
    if (playlistId === 1) {
      return;
      // TODO: Cannot delete all playlist.
    }
    let activePlaylist = this.state.activePlaylist;

    let playlists = playlistReducer(this.state.playlists, {
      type: "DELETE",
      payload: { playlistId },
    });

    let music = this.state.music.map((song) => {
      song.playlists = song.playlists.filter((list) => list !== playlistId);
      return song;
    });

    if (playlistId === this.state.activePlaylist) {
      activePlaylist = 1;
    }

    this.setState({
      music,
      playlists,
      activePlaylist,
    });
  }

  getSongAction() {
    switch (this.state.activeModal) {
      case 1:
        return (
          <AddSongToPlaylistForm
            song={getSongFromId(this.state.music, this.state.activeSong)}
            playlists={this.state.playlists}
            action={this.getCallback(this.state.activeModal)}
          />
        );
      case 2:
        return (
          <DeleteSongFromPlaylistForm
            song={getSongFromId(this.state.music, this.state.activeSong)}
            playlist={getPlaylistFromId(
              this.state.playlists,
              this.state.activePlaylist
            )}
            action={this.getCallback(this.state.activeModal)}
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
            addPlaylist={this.addPlaylist}
            deletePlaylist={this.deletePlaylist}
            showPlaylist={this.setActivePlaylist}
          />
          <MusicDisplay
            title={getPlaylistFromId(playlists, activePlaylist).name}
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
