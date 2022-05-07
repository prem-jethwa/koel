// import { DEFALULT_PLAYLIST, NO_SONG_OBJ } from "./config.js";
// const TOKEN = localStorage.getItem("token");
// document.querySelector(".loader-model").classList.remove("hidden");
import {
  controlAddSongsData,
  controlOpenForm,
} from "./Controller/addSongController.js";
// Fav and delete Song controler
import controlFavAndDel from "./Controller/favAndDelSongController.js";
// LoadUiController
import {
  controlPlay,
  // loadSongIfExist,
  generatePaginationAndRenderPlaylist,
  // loadUi,
  renderUserDetails,
} from "./Controller/loadUiController.js";
// PlayControler
import {
  controlClickedSong,
  controlNextSong,
  controlPrevSong,
  controlProgressBar,
  controlUpatedProgress,
} from "./Controller/playController.js";
// Playlist
import { controlPlaylistBtn } from "./Controller/playlistController.js";
// SearchController
import {
  controlBackToPlaylistBtn,
  controlSearchInputs,
  // loadAndRenderPlaylist,
  // loadSearchResults,
  // loadingBeforeSearchPlaylist,
  controlSearchResults,
} from "./Controller/searchController.js";
// userController
import {
  controlLogoutAndUpdate,
  controlUpdateUserData,
} from "./Controller/userController.js";
import * as stateModel from "./Model/stateModel.js";
// header view
import AddSongView from "./view/header/addSongView.js";
import LoginView from "./view/header/loginView.js";
import SerachView from "./view/header/searchView.js";
import UpdateUserData from "./view/header/updateUserData.js";
import PaginationView from "./view/paginationView.js";
import playlistView from "./view/playlistView.js";
// import * as playModel from "./Model/playModel.js";
// import * as searchModel from "./Model/searchModel.js";
// import * as userModel from "./Model/userModel.js";
// import * as songModel from "./Model/songModel.js";
import playView from "./view/playView.js";

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
    playlistView.renderSpinner();
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) await renderUserDetails();
    stateModel.loadSongPlaylistsState();
    init();
    // document.querySelector(".loader-model").classList.add("hidden");

    console.log("end");
  } catch (err) {
    document.body = err;
  }
};

loading();
