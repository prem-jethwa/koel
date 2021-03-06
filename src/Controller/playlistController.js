import { DEFALULT_PLAYLIST } from "../config.js";

import * as stateModel from "../Model/stateModel.js";
import playView from "../view/playView.js";

// import playView from "../view/playView.js"; //updated1
import PaginationView from "../view/paginationView.js";
import SerachView from "../view/header/searchView.js";

// LoadUiController
import { generatePaginationAndRenderPlaylist } from "./loadUiController.js";

export let beforeSearchPlaylistName = DEFALULT_PLAYLIST;

export const loadPlaylist = async function (
  playlistName,
  pageNum,
  updateFirstSong = true
) {
  stateModel.state.isPlaying = false;

  const currentPlaylist = stateModel.state.playlists[playlistName];
  // pagination
  await generatePaginationAndRenderPlaylist(pageNum, playlistName);
  await PaginationView.setSongs(currentPlaylist);

  stateModel.state.currPlaylist = playlistName;

  if (!updateFirstSong) return;
  playView.pauseSong(); //updated1
  // assingning currplaylist from btn name element
  const playlistFirstSong = await currentPlaylist[0];
  stateModel.state.currSong = playlistFirstSong;
};

export const controlPlaylistBtn = async function (playlistName) {
  const currPlaylist = await stateModel.state.currPlaylist;
  beforeSearchPlaylistName = playlistName;

  if (currPlaylist === playlistName) return;

  await loadPlaylist(playlistName, 1, false);

  // Rendering songs to ui
  generatePaginationAndRenderPlaylist(1, playlistName);

  // remove Search render btn
  if (!SerachView.checkBackToPlayBtn) return;
  SerachView.removeBackToPlaylistBtn();
};
