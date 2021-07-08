import * as stateModel from "../Model/stateModel.js";
import * as searchModel from "../Model/searchModel.js";
import SerachView from "../view/header/searchView.js";

// LoadUiController
import {
  loadSongIfExist,
  generatePaginationAndRenderPlaylist,
} from "./loadUiController.js";

import {
  loadPlaylist,
  beforeSearchPlaylistName,
} from "./playlistController.js";

export const loadAndRenderPlaylist = async function (playlistName) {
  const currPlaylist = stateModel.state.playlists[playlistName];

  await loadSongIfExist(currPlaylist);
  await loadPlaylist(playlistName, 1);
  await generatePaginationAndRenderPlaylist(1, playlistName, false); //added
  // DEPRICATED
  // const playlistPage = playModel.genaratePlylistPageWithPageNum(1, playlistName);
  // playlistView.render(playlistPage);
};

export const loadSearchResults = async function (results) {
  if (!results) return;

  stateModel.state.playlists.searchResults = results;

  await loadAndRenderPlaylist("searchResults");

  if (
    results.length ===
    stateModel.state.playlists[beforeSearchPlaylistName].length
  )
    return;
  await SerachView.renderBackToPlaylistBtn();
  SerachView.setBackToPlaylist(true);
};

const loadingBeforeSearchPlaylist = async function (playlistName) {
  await loadAndRenderPlaylist(playlistName);

  await SerachView.removeBackToPlaylistBtn();
};
/** controlSearchResults()
 * Load Playlist and Render to DOM if Search if "TRUE"
 * @param {String} keyword Take Keyword and Gets matching Resuls to render;
 * @param {String} language Filter Results if language is not "Language" and "language" is Default Value;
 * @param {Boolean} search Default is "FALSE" if its an "true" Then it will render the playlist in DOM;
 * @returns Renders playlist to DOM with matching Results.
 */
export const controlSearchResults = async function (
  keyword,
  language,
  search = false
) {
  if (!search && !keyword)
    await loadingBeforeSearchPlaylist(beforeSearchPlaylistName);

  if (!keyword || !search) return;

  const validKeyword = keyword.split(",").slice(0, 1).join("").trim();
  const results = await searchModel.getMatchingResults(validKeyword, language);

  if (!results[0]) return;
  await loadSearchResults(results);
};

/** controlSearchInputs()
 * Display the matching Results below search box
 * @param {String} val to get matching results.
 * @param {String} language Filter Results if language is not "Language" and "language" is Default Value;
 * @returns renders results to DOM;
 */
export const controlSearchInputs = async function (val, language) {
  if (!val) return loadingBeforeSearchPlaylist(beforeSearchPlaylistName);

  const matchingSongs = await searchModel.getMatchingResults(val, language);
  SerachView.renderSearchResults(matchingSongs, val);
};

export const controlBackToPlaylistBtn = async function () {
  await loadAndRenderPlaylist(beforeSearchPlaylistName);
};
