import { API_URL, PER_PAGE } from "../config.js";
import { NO_DATA_AJAX, UPLOAD_AJAX } from "../helpers.js";
// STATE
import { playlistsState, state, updateFavSongs } from "./stateModel.js";

export const uploadNewSong = async (formData) => {
  state.addSongCount = state.addSongCount + 1;
  const fileData = new FormData();

  for (let key in formData) {
    fileData.append(key, formData[key]);
  }

  await UPLOAD_AJAX("POST", `${API_URL}songs/new-song`, fileData);
};

export const addOrRemoveFav = async (songId, index) => {
  try {
    await updateFavSongs();
    await NO_DATA_AJAX("GET", `${API_URL}songs/favorite/${songId}`);
  } catch (err) {
    console.log(err);
  }
};

export const findSongAndRemove = async (songId) => {
  try {
    const playlistName = state.currPlaylist;
    const currPlaylist = await state.playlists[playlistName];

    const playlists = [...Object.values(playlistsState)];

    const totalPage = Math.ceil(currPlaylist.length / PER_PAGE);
    const totalSongs = currPlaylist.length;

    const allPageWithOutLastPage = (totalPage - 1) * PER_PAGE;
    const songsInLastPage = totalSongs - allPageWithOutLastPage;

    // console.log(songsInLastPage, totalPage, totalSongs, allPageWithOutLastPage); //test
    playlists.map((playlist) => {
      const index = playlist.findIndex((song) => song.id === songId);
      if (index <= -1) return;
      playlist.splice(index, 1);
    });

    state.addSongCount = state.addSongCount - 1;
    await NO_DATA_AJAX("DELETE", `${API_URL}songs/${songId}`);
    return { totalPage, songsInLastPage };
  } catch (err) {
    console.log(err);
  }
};
