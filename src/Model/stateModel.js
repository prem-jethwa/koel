import { API_URL, DEFALULT_PLAYLIST, PER_PAGE } from "../config.js";
import {
  AJAX,
  getAllPlaylists,
  getSongPlaylist,
  getImgUrl,
  UPLOAD_AJAX,
  setFavSongs,
  NO_DATA_AJAX,
  formatSong,
} from "../helpers.js";

export let playlistsState = {
  global: [],
  mySongs: [],
  favourite: [],
};

export const state = {
  playlists: {
    global: [],
    mySongs: [],
    favourite: [],
    searchResults: [],
  },
  bookmarks: [],
  progressDetails: {
    currentTimeState: "00:00",
    durationState: 0,
    progressWidth: 0,
  },
  music: {
    duration: 0,
    currentTime: 0,
  },
  currSong: {},
  currPlaylist: DEFALULT_PLAYLIST,
  currPageNum: 1,
  isLogedIn: false, //TEST
  user: {},
  addSongCount: 0,
  isPlaying: false,
};

let isLoadingSong = false;
// old Name -> loadSongsState
export const getSongById = async (songId) => {
  if (isLoadingSong) return;

  isLoadingSong = true;
  const song = await AJAX("GET", `${API_URL}songs/${songId}`);
  isLoadingSong = false;

  const formatedSong = await formatSong(song, true);

  console.log(formatedSong);
  state.currSong = formatedSong;
  return state.currSong;
};

export const updateFavSongs = async () => {
  const fav = await state.playlists.favourite;
  const global = await state.playlists.global;
  const mySongs = await state.playlists.mySongs;

  setFavSongs(global, fav);
  setFavSongs(mySongs, fav);

  // console.log(state.playlists.searchResults);
  if (state.playlists.searchResults && state.playlists.searchResults[0]) {
    const searchResults = await state.playlists.searchResults;

    setFavSongs((searchResults, fav));
  }
};

export const loadSongPlaylistsState = async function (setCurrSong = true) {
  try {
    const isUserLogedIn = await state.isLogedIn;
    if (!isUserLogedIn) {
      const { global } = await getSongPlaylist("global");

      state.playlists.global = await global;
      const songID = await state.playlists.global[0]?.id;

      playlistsState = await { global, mySongs: [], favourite: [] };

      await getSongById(songID);
      return state;
    }

    const { global, mySongs, favourite } = await getAllPlaylists();

    state.addSongCount = mySongs.length;

    state.playlists = await { global, mySongs, favourite };
    playlistsState = await { global, mySongs, favourite };

    updateFavSongs();

    if (setCurrSong) {
      const songID = state.playlists.global[0].id;
      await getSongById(songID);
    }

    // console.log({ global, mySongs, favourite }); //test
    return state;
  } catch (err) {
    console.log("loadPlaylistState:", err);
  }
};

export const loadVirtualState = async (setCurrSong = false) => {
  const { global, mySongs, favourite } = await playlistsState;

  await updateFavSongs();

  if (setCurrSong) {
    const songID = state.playlists.global[0].id;

    if (state.currSong.id !== songId) await getSongById(songID);
  }

  state.playlists = await { global, mySongs, favourite };
  return state;
};
