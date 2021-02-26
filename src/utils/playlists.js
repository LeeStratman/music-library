export function getPlaylistLengthFromMusic(music, playlistId) {
  return getPlaylistSongsFromMusic(music, playlistId).length;
}

export function getPlaylistSongsFromMusic(music, playlistId) {
  return music.filter((song) => song.playlists.includes(playlistId));
}

function addNewPlaylist(playlists, name) {
  return [
    ...playlists,
    {
      name,
      id: playlists.length + 1,
    },
  ];
}

function deletePlaylist(playlists, playlistId) {
  return [...playlists.filter((list) => list.id !== playlistId)];
}

export function playlistReducer(playlists, action) {
  switch (action.type) {
    case "ADD":
      return addNewPlaylist(playlists, action.payload);
    case "DELETE":
      return deletePlaylist(playlists, action.payload);
    default:
      return playlists;
  }
}
