export default function musicReducer(music, action) {
  switch (action.type) {
    case "ADD":
      return addSong(music, action.payload);
    case "DELETE":
      return deleteSong(music, action.payload);
    case "UPDATE":
      return updateSong(music, action.payload);
    case "ADD_TO_PLAYLIST":
      return addSongToPlaylist(music, action.payload);
    case "REMOVE_FROM_PLAYLIST":
      return removeSongFromPlaylist(music, action.payload);
    default:
      return music;
  }
}

function addSong(music, song) {
  return [...music, song];
}

function deleteSong(music, { songId }) {
  return [...music.filter((song) => song.id !== songId)];
}

function updateSong(music, { song }) {
  return [
    ...music.map((currentSong) => {
      if (currentSong.id === song.id) {
        return song;
      }
      return currentSong;
    }),
  ];
}

function addSongToPlaylist(music, { songId, playlistId }) {
  return [
    ...music.map((song) => {
      if (song.id === songId) {
        if (!song.playlists.includes(Number(playlistId))) {
          song.playlists = [...song.playlists, Number(playlistId)];
        }
      }
      return song;
    }),
  ];
}

function removeSongFromPlaylist(music, { songId, playlistId }) {
  return [
    ...music.map((song) => {
      if (song.id === songId) {
        song.playlists = song.playlists.filter(
          (list) => list !== Number(playlistId)
        );
      }
      return song;
    }),
  ];
}
