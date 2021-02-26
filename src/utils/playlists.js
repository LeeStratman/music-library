export function getPlaylistLengthFromMusic(music, playlistId) {
  return getPlaylistSongsFromMusic(music, playlistId).length;
}

export function getPlaylistSongsFromMusic(music, playlistId) {
  return music.filter((song) => song.playlists.includes(playlistId));
}
