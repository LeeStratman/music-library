export default function playlistReducer(playlists, action) {
  switch (action.type) {
    case "ADD":
      return addNewPlaylist(playlists, action.payload);
    case "DELETE":
      return deletePlaylist(playlists, action.payload);
    case "ADD_TO_PLAYLIST":
      return incrementPlaylistLength(playlists, action.payload);
    case "REMOVE_FROM_PLAYLIST":
      return decrementPlaylistLength(playlists, action.payload);
    case "REMOVE_FROM_PLAYLISTS":
      return decrementPlaylistsLength(playlists, action.payload);
    case "SET_LENGTH":
      return setPlaylistLength(playlists, action.payload);
    default:
      return playlists;
  }
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

function deletePlaylist(playlists, { playlistId }) {
  return [...playlists.filter((list) => list.id !== playlistId)];
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

function decrementPlaylistsLength(playlists, { playlistIds }) {
  return [
    ...playlists.map((list) => {
      if (playlistIds.includes(list.id)) {
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
