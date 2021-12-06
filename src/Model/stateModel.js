import { API_URL, DEFALULT_PLAYLIST } from "../config.js";
import {
  AJAX,
  formatSong,
  getAllPlaylists,
  getSongPlaylist,
  setFavSongs,
} from "../helpers.js";

export let playlistsState = {
  global: [],
  mySongs: [],
  favorite: [],
};

export const state = {
  playlists: {
    global: [],
    mySongs: [],
    favorite: [],
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

  state.currSong = await formatSong(song, true);
  return state.currSong;
};

export const updateFavSongs = async () => {
  const fav = await state.playlists.favorite;
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

      state.playlists.global = global;
      // const songID = await state.playlists.global[0]?.id;

      playlistsState = {
        global,
        mySongs: [],
        favorite: [],
      };

      await getSongById(state.playlists.global[0]?.id);
      return state;
    }

    const { global, mySongs, favorite } = await getAllPlaylists();

    state.addSongCount = mySongs.length;

    state.playlists = playlistsState = await {
      global,
      mySongs,
      favorite,
    };

    if (setCurrSong) {
      await getSongById(state.playlists.global[0].id);
    }

    await updateFavSongs();
    return state;
  } catch (err) {
    console.log(">> loadPlaylistState:", err);
  }
};

export const loadVirtualState = async (setCurrSong = false) => {
  const { global, mySongs, favorite } = await playlistsState;

  await updateFavSongs();

  if (setCurrSong) {
    const songID = state.playlists.global[0].id;

    if (state.currSong.id !== songId) await getSongById(songID);
  }

  state.playlists = await { global, mySongs, favorite };
  return state;
};
