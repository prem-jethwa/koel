import { AUTO_LOGOUT, DEFALULT_PLAYLIST, NO_SONG_OBJ } from "../config.js";
const TOKEN = localStorage.getItem("token");

import * as stateModel from "../Model/stateModel.js";
import * as playModel from "../Model/playModel.js";
// import * as searchModel from "../Model/searchModel.js";
import * as userModel from "../Model/userModel.js";
// import * as songModel from "../Model/songModel.js";

import playView from "../view/playView.js";
import playlistView from "../view/playlistView.js";
import PaginationView from "../view/paginationView.js";

// header view
// import AddSongView from "../view/header/addSongView.js";
import LoginView from "../view/header/loginView.js";
import { logout } from "./userController.js";
// import UpdateUserData from "../view/header/updateUserData.js";
// import SerachView from "../view/header/searchView.js";

// import {
//   controlClickedSong,
//   controlUpatedProgress,
//   controlProgressBar,
//   controlNextSong,
//   controlPrevSong,
// } from "./playController.js";

// setProgressBar
export const controlPlay = function () {
  if (!stateModel.state.isPlaying) {
    playView.playSong();
    stateModel.state.isPlaying = true;
    // UPDATE Playlist SVG
    playlistView.setPauseSvg(stateModel.state.currSong.id);
  } else {
    playView.pauseSong();
    stateModel.state.isPlaying = false;
    playlistView.setPlaySvg();
  }
};

/** generatePaginationAndRenderPlaylist()
 * Performs PAGINATION and Renders(optional) Playlist
 * @param {numder} pageNum Numder of page to crop playlist;
 * @param {string} playlistName Name of playlist to render and also for pagination;
 * @param {Boolean} render Default is "True" which means render the playlist eo DOM if its set to "false" then it will does not renders the PLYLIST just performs the pagination
 */
export async function generatePaginationAndRenderPlaylist(
  pageNum,
  playlistName,
  render = true
) {
  const currPage = await playModel.genaratePlylistPageWithPageNum(
    pageNum,
    playlistName
  );
  // const currentPlaylist = await stateModel.state.playlists[playlistName]; //update2

  await PaginationView.setCurrPage(pageNum);
  await PaginationView.renderPages();
  await PaginationView.updatePageBackground(pageNum);
  // await PaginationView.setSongs(currentPlaylist);

  // renderPlaylist
  if (!render) return;
  await playlistView.render(currPage);
}

/**
 *
 * @param {String} currentPlaylist Playlist in which we want to render the 1st song to player if exist it will render otherwise it will display the "NO song for display" (NO_SONG_OBJ)
 * @returns
 */
export const loadSongIfExist = async function (currentPlaylist) {
  if (!currentPlaylist[0]) {
    playView.renderSong(NO_SONG_OBJ);

    if (stateModel.state.isLogedIn)
      return playlistView.renderMessage("No songs Available!");
    else playlistView.renderMessage("Login to Add songs..");
  } else {
    // Disply first song
    playView.renderPlayLoader();
    await playView.renderSong(stateModel.state.currSong);
    playView.pauseSong();
  }
};

const autoLogout = () => {
  setTimeout(async () => {
    logout(false);
    console.log("logout User!!");
  }, 1000 * 60 * 10);
};

// const clearLocal = () => {
//   localStorage.removeItem("token");
//   localStorage.clear();
//   state.isLogedIn = false;
//   state.user = {};
// };

export const renderUserDetails = async function () {
  const user = await userModel.getUser();

  if (!user?.name && !TOKEN) return;
  if (!user?.name) return logout(false);

  if (AUTO_LOGOUT) autoLogout();
  playlistView.setUser(stateModel.state.user);

  if (stateModel.state.isLogedIn) await LoginView.render(user, false);

  const imgUrl = await userModel.getAvatar();
  if (!imgUrl) return;
  LoginView.setAvatar(imgUrl);
};

/** loadUi()
 * Loads a all required component to display on UI
 * @param {boolean} update default is false that executes the renderSong()
 * @param {boolean} update true will re-load the all ui except the played song(NOT renderSong())
 */
export const loadUi = async function (update = true) {
  playlistView.renderSpinner();
  // Rendering User Detail if its login
  // playView.pauseSong();
  await stateModel.loadVirtualState();

  const playlistName = stateModel.state.currPlaylist;
  const currentPlaylist = await stateModel.state.playlists[playlistName];

  if (update) await loadSongIfExist(currentPlaylist);

  // pagination
  await PaginationView.setSongs(currentPlaylist);

  // Rendering songs to ui
  generatePaginationAndRenderPlaylist(1, playlistName);
};

// export default {
//   controlPlay,
//   loadUi,
//   renderUserDetails,
//   loadSongIfExist,
//   generatePaginationAndRenderPlaylist,
//   controlPlay,
// };
