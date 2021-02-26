export function getPlaylistLengthFromMusic(music, playlistId) {
  return getPlaylistSongsFromMusic(music, playlistId).length;
}

export function getPlaylistSongsFromMusic(music, playlistId) {
  return music.filter((song) => song.playlists.includes(playlistId));
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

function addNewPlaylist(playlists, name) {
  return [
    ...playlists,
    {
      name: name.trim(),
      id: playlists.length + 1,
      length: 0,
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
    case "ADD_TO_PLAYLIST":
      return incrementPlaylistLength(playlists, action.payload);
    case "REMOVE_FROM_PLAYLIST":
      return decrementPlaylistLength(playlists, action.payload);
    case "SET_LENGTH":
      return setPlaylistLength(playlists, action.payload);
    default:
      return playlists;
  }
}

function incrementPlaylistLength(playlists, { playlistId }) {
  return [
    ...playlists.map((list) => {
      if (list.id === Number(playlistId)) {
        list.length = list.length + 1;
      }
      return list;
    }),
  ];
}

function decrementPlaylistLength(playlists, { playlistId }) {
  return [
    ...playlists.map((list) => {
      if (list.id === playlistId) {
        list.length = list.length - 1;
      }
      return list;
    }),
  ];
}

function setPlaylistLength(playlists, { playlistId, length }) {
  return [
    ...playlists.map((list) => {
      if (list.id === playlistId) {
        list.length = length;
      }
      return list;
    }),
  ];
}
