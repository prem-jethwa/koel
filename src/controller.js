// import { DEFALULT_PLAYLIST, NO_SONG_OBJ } from "./config.js";
// const TOKEN = localStorage.getItem("token");
document.querySelector(".loader-model").classList.remove("hidden");
import * as stateModel from "./Model/stateModel.js";
// import * as playModel from "./Model/playModel.js";
// import * as searchModel from "./Model/searchModel.js";
// import * as userModel from "./Model/userModel.js";
// import * as songModel from "./Model/songModel.js";

import playView from "./view/playView.js";
import playlistView from "./view/playlistView.js";
import PaginationView from "./view/paginationView.js";

// header view
import AddSongView from "./view/header/addSongView.js";
import LoginView from "./view/header/loginView.js";
import UpdateUserData from "./view/header/updateUserData.js";
import SerachView from "./view/header/searchView.js";

// LoadUiController
import {
  controlPlay,
  loadUi,
  renderUserDetails,
  // loadSongIfExist,
  generatePaginationAndRenderPlaylist,
} from "./Controller/loadUiController.js";

// PlayControler
import {
  controlClickedSong,
  controlUpatedProgress,
  controlProgressBar,
  controlNextSong,
  controlPrevSong,
} from "./Controller/playController.js";

import {
  controlOpenForm,
  controlAddSongsData,
} from "./Controller/addSongController.js";

// Playlist
import {
  beforeSearchPlaylistName,
  loadPlaylist,
  controlPlaylistBtn,
} from "./Controller/playlistController.js";

// userController
import {
  logout,
  controlUpdateUserData,
  controlLogoutAndUpdate,
} from "./Controller/userController.js";

// SearchController
import {
  // loadAndRenderPlaylist,
  // loadSearchResults,
  // loadingBeforeSearchPlaylist,
  controlSearchResults,
  controlSearchInputs,
  controlBackToPlaylistBtn,
} from "./Controller/searchController.js";

// Fav and delete Song controler
import controlFavAndDel from "./Controller/favAndDelSongController.js";

// pagination
const controlPagination = function (pageNum) {
  generatePaginationAndRenderPlaylist(pageNum);
};

//Event handlers
const init = async function () {
  // headers view
  AddSongView.addHandlerOpenForm(controlOpenForm);
  AddSongView.addHandlerCloseForm();
  AddSongView.addHandlerAddSongData(controlAddSongsData);
  LoginView.addHandlerOpenUserDetails();
  LoginView.addHandlerCloseUserDetails();
  LoginView.addHandlerLogoutAndUpdate(controlLogoutAndUpdate);
  UpdateUserData.addHandlerUpdateData(controlUpdateUserData);
  UpdateUserData.addHandlerCloseUpdateForm();
  UpdateUserData.addHandlerUpdateAvatar();
  // Search events
  SerachView.addhandlerSearchByKeyword(controlSearchInputs);
  SerachView.addHandlerSearchByClickOnResuls(controlSearchResults);
  SerachView.addHandlerSearchByArrowKey(controlSearchResults);
  SerachView.addhandlerSearchByFormSubmit(controlSearchResults);
  SerachView.addHandlerBackToPlaylist(controlBackToPlaylistBtn);
  // pagination
  PaginationView.addHandlerPagination(controlPagination);

  // playlist handlers
  playlistView.addHandlerplaylistBtn(controlPlaylistBtn);
  playlistView.addHandlerPlayClickedSong(controlClickedSong);
  playlistView.addHandlerFavAndDelete(controlFavAndDel);

  // progress bar
  playView.addHandlerProgress(controlProgressBar);
  playView.addHandlerProgressUpdate(controlUpatedProgress);

  // botton prav/next/play
  playView.addHandlerPrevSong(controlPrevSong);
  playView.addHandlerNextSong(controlNextSong);
  playView.addHandlerPlay(controlPlay);
};
const loading = async () => {
  try {
    // console.log("start");
    const TOKEN = localStorage.getItem("token");

    if (TOKEN) await renderUserDetails();
    // console.log("user render Done");
    await stateModel.loadSongPlaylistsState();
    // console.log("loaded Playlist");

    document.querySelector(".loader-model").classList.add("hidden");
    loadUi();
    init();

    console.log("end");
  } catch (err) {
    document.body = err;
  }
};

loading();

// window.addEventListener("load", );

// if (playlistName === "favourite") {
//   const index = currPlaylist.findIndex((song) => song.id === songId);

//   currPlaylist.splice(index, 1);
//   return stateModel.updateFavSongs();
// }

// const song = currPlaylist.filter((song) => song.id === songId);
// stateModel.state.playlists.favourite.push(song);
