export function getPlaylistLengthFromMusic(music, playlistId) {
  return getPlaylistSongsFromMusic(music, playlistId).length;
}

export function getPlaylistSongsFromMusic(music, playlistId) {
  return music.filter((song, index) => song.playlists.includes(playlistId));
}

export function filterPlaylistByName(playlists, name) {
  return playlists.filter(
    (list) => list.name.toLowerCase() === name.toLowerCase().trim()
  );
}

export function getPlaylistFromId(playlists, id) {
  return playlists.find((list) => list.id === id);
}

export function playlistExists(playlists, name) {
  let playlist = filterPlaylistByName(playlists, name);

  if (playlist.length > 0) {
    return false;
  }

  return true;
}
