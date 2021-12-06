import { PER_PAGE } from "../config.js";

import { state, getSongById } from "./stateModel.js";

export function genaratePlylistPageWithPageNum(
  pageNum,
  playlistName = state.currPlaylist
) {
  const page = pageNum * PER_PAGE - PER_PAGE;

  const playlist = state.playlists[playlistName];
  const songs = [...playlist].splice(Math.ceil(page), PER_PAGE);

  state.currPageNum = pageNum;
  return songs;
}

// Current Song
let songIndex = 0;

// state.playlists[state.currPlaylist]
// Previous Song
export async function prevSong() {
  const playlist = genaratePlylistPageWithPageNum(state.currPageNum);

  songIndex--;
  if (songIndex < 0) {
    songIndex = playlist.length - 1;
  }

  const songId = playlist[songIndex].id;
  state.currSong = await getSongById(songId);
  return songIndex;
}

// Next Song
export async function nextSong() {
  const playlist = genaratePlylistPageWithPageNum(state.currPageNum);
  songIndex++;
  if (songIndex > playlist.length - 1) {
    songIndex = 0;
  }

  const songId = playlist[songIndex].id;
  state.currSong = await getSongById(songId);
  return songIndex;
}

// play clicked song
export const updateCurrentSong = async function (song) {
  state.currSong = await getSongById(song.id);
  return state.currSong;
};

// Update Progress Bar & Time
// Old name -> updateProgressBar
export function calcSaveProgressBarDetails(e) {
  let durationState, currentTimeState, progressWidth;

  const { duration, currentTime } = e.srcElement;

  // Update progress bar width
  const progressPercent = (currentTime / duration) * 100;
  progressWidth = `${progressPercent}%`;

  // Calculate display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // Delay switching duration Element to avoid NaN
  if (durationSeconds) {
    durationState = `${durationMinutes}:${durationSeconds}`;
  }

  // Calculate display for currentTime
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  currentTimeState = `${currentMinutes}:${currentSeconds}`;

  state.progressDetails = { currentTimeState, durationState, progressWidth };
}

export function calcSaveSongDetails(e, clientWidth, duration) {
  const width = clientWidth;
  const clickX = e.offsetX;

  const currentTime = ((clickX / width) * duration).toFixed(2);

  state.music = { duration, currentTime };
}
