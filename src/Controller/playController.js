import * as stateModel from "../Model/stateModel.js";
import * as playModel from "../Model/playModel.js";

import playView from "../view/playView.js";
import playlistView from "../view/playlistView.js";

// Previous / Next song
export const controlPrevSong = async function () {
  stateModel.state.isPlaying = true;

  // loading song
  playView.renderPlayLoader();
  await playModel.prevSong();
  await playView.renderSong(stateModel.state.currSong);

  // playing song
  playView.playSong();

  // UPDATE Playlist SVG
  playlistView.setPlaySvg();
  playlistView.setPauseSvg(stateModel.state.currSong.id);
};
export const controlNextSong = async function () {
  stateModel.state.isPlaying = true;

  // loading song
  playView.renderPlayLoader();
  await playModel.nextSong();
  await playView.renderSong(stateModel.state.currSong);

  // playing song
  playView.playSong();

  // UPDATE Playlist SVG
  playlistView.setPlaySvg();
  playlistView.setPauseSvg(stateModel.state.currSong.id);
};

// calcSaveProgressBarDetails
export const controlProgressBar = async function (e) {
  await playModel.calcSaveProgressBarDetails(e);

  await playView.updateProgress(stateModel.state.progressDetails);
};

export const controlUpatedProgress = async function (e, clientWidth) {
  const duration = await playView.getDuration();

  await playModel.calcSaveSongDetails(e, clientWidth, duration);

  await playView.setMusicTime(stateModel.state.music.currentTime);

  // Update progress bar
  playModel.calcSaveProgressBarDetails(e);
  playView.updateProgress(stateModel.state.progressDetails);
};

export const controlClickedSong = async function (e, song) {
  if (!song) return;

  const stateCurrSong = await stateModel.state.currSong;

  if (song.id === stateCurrSong.id && stateModel.state.isPlaying) {
    // loading song
    await playView.renderSong(stateCurrSong);
    await playView.pauseSong();
    playlistView.setPlaySvg();

    return (stateModel.state.isPlaying = false);
  }

  playView.renderPlayLoader();
  const loadedSong = await stateModel.getSongById(song.id);

  // loading song
  await playView.renderSong(loadedSong);
  await playModel.calcSaveProgressBarDetails(e);

  // Seting the state
  playModel.updateCurrentSong(loadedSong);
  stateModel.state.isPlaying = true;

  // UPDATE Playlist SVG
  playlistView.setPlaySvg();
  playlistView.setPauseSvg(song.id);

  // playing song
  await playView.playSong();
};

// export default {
//   controlClickedSong,
//   controlUpatedProgress,
//   controlProgressBar,
//   controlNextSong,
//   controlPrevSong,
// };
