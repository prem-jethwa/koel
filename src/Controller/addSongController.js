import * as stateModel from "../Model/stateModel.js";
import * as songModel from "../Model/songModel.js";

// header view
import AddSongView from "../view/header/addSongView.js";

// LoadUiController
import { loadUi } from "./loadUiController.js";

export const controlOpenForm = () => {
  if (!stateModel.state.isLogedIn) return ["Login to upload a Song", "error"];

  if (stateModel.state.addSongCount >= 2)
    return ["Max 2 songs a single user can upload!", "error"];
};

export const controlAddSongsData = async function (formData) {
  try {
    if (!formData) return;

    AddSongView.renderNotification("This might take While...", "success");
    await songModel.uploadNewSong(formData);
    await stateModel.loadSongPlaylistsState();
    await loadUi(false);

    AddSongView.renderNotification("SONG added Successfully", "success");
  } catch (err) {
    console.log(err);
    AddSongView.renderNotification("Some Error on server", "error");
  }
};
