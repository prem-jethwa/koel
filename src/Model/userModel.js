import { API_URL } from "../config.js";
import { AJAX, getImgUrl, NO_DATA_AJAX, UPLOAD_AJAX } from "../helpers.js";
// STATE
import {
  loadSongPlaylistsState,
  loadVirtualState,
  playlistsState,
  state,
  updateFavSongs,
} from "./stateModel.js";

export async function logoutUser() {
  try {
    localStorage.removeItem("token");
    localStorage.clear();
    state.isLogedIn = false;
    state.user = {};
    state.playlists.favorite = [];
    playlistsState.favorite = [];
    await loadSongPlaylistsState();
    await loadVirtualState();
    await updateFavSongs();
    await NO_DATA_AJAX("GET", `${API_URL}user/logout`);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser() {
  try {
    const data = await AJAX("GET", `${API_URL}user`);

    if (data?.status === 404 || data?.data.type === "error")
      throw new Error("not found");

    const { name, email, _id } = data.data;

    state.user = { name, email, id: _id };
    state.isLogedIn = true;

    return state.user;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.clear();
    state.isLogedIn = false;
    state.user = {};
    console.log("Error: User NOT Found!", err);
  }
}

export async function updateUser(formData) {
  try {
    delete formData.avatar;
    const data = await AJAX("PUT", `${API_URL}user`, formData);

    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export const uploadAvatar = async function (imgFile) {
  try {
    if (!imgFile) return;

    const formData = new FormData();
    formData.append("userAvatar", imgFile, imgFile.name);

    const data = await UPLOAD_AJAX("POST", `${API_URL}user/avatar`, formData);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAvatar = async function () {
  try {
    if (!state.user) return;

    const data = await AJAX("GET", `${API_URL}user/avatar/${state.user.id}`);
    if (data.status === 404) return;

    const imgBufferArr = data.data.avatar.data;

    const imageurl = getImgUrl(imgBufferArr);
    state.user.avatarUrl = imageurl;
    return imageurl;
  } catch (err) {
    console.log(err);
  }
};
