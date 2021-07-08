import * as stateModel from "../Model/stateModel.js";
import * as songModel from "../Model/songModel.js";

import playlistView from "../view/playlistView.js";
import PaginationView from "../view/paginationView.js";

// LoadUiController
import {
  loadUi,
  generatePaginationAndRenderPlaylist,
} from "./loadUiController.js";

const controlFavAndDel = async function (songId, type) {
  const playlistName = await stateModel.state.currPlaylist;
  const currPlaylist = await stateModel.state.playlists[playlistName];
  const currPage = await stateModel.state.currPageNum;
  const favPlaylist = await stateModel.playlistsState.favourite;

  console.log(favPlaylist);

  if (!stateModel.state.isLogedIn)
    return playlistView.renderNotification("LOGIN to add favourite song");

  if (type === "fav") {
    const index = favPlaylist.findIndex((song) => song?.id === songId);

    // console.log(index);
    if (index !== undefined && index <= -1) {
      const song = currPlaylist.filter((song) => song.id === songId);
      favPlaylist.push(song[0]);
    } else {
      favPlaylist.splice(index, 1);
    }

    // await stateModel.updateFavSongs();
    // await loadUi(false);
    // if (playlistName === "favourite")
    await PaginationView.setSongs(currPlaylist);
    generatePaginationAndRenderPlaylist(currPage, playlistName);

    songModel.addOrRemoveFav(songId, index);
  }

  if (type === "del") {
    playlistView.renderNotification("Deleting....");

    const { totalPage, songsInLastPage } = await songModel.findSongAndRemove(
      songId
    );

    if (+currPage === totalPage && songsInLastPage === 1) {
      await stateModel.loadSongPlaylistsState();
      await loadUi();
      return;
    }
    await PaginationView.setSongs(currPlaylist);
    generatePaginationAndRenderPlaylist(currPage, playlistName);
  }

  // await PaginationView.setSongs(currPlaylist);
  // if (playlistName !== "favourite") return;
  // generatePaginationAndRenderPlaylist(currPage, playlistName);
};

export default controlFavAndDel;
