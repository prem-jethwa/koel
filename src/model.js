///////////////////////////////////////////
//Main App logic
import { API_URL, DEFALULT_PLAYLIST, PER_PAGE } from "./config.js";
import {
  AJAX,
  getAllPlaylists,
  getSongPlaylist,
  getImgUrl,
  UPLOAD_AJAX,
  setFavSongs,
  NO_DATA_AJAX,
} from "./helpers.js";

// STATE
import {
  state,
  playlistsState,
  getSongById,
  updateFavSongs,
  loadSongPlaylistsState,
  loadVirtualState,
} from "./Model/stateModel.js";

// USER
// import {
//   logoutUser,
//   getUser,
//   updateUser,
//   uploadAvatar,
//   getAvatar,
// } from "./Model/userModel.js";

// SONG
// import {
//   findSongAndRemove,
//   addOrRemoveFav,
//   uploadNewSong,
// } from "./Model/songModel.js"

// PlAY
// import {
//   prevSong,
//   nextSong,
//   calcSaveSongDetails,
//   calcSaveProgressBarDetails,
//   updateCurrentSong,
// } from "./Model/playModel.js";

// SEARCH
// import {
//   getMatchingResults,
// } from "./Model/stateModel.js"

// pagination

/////////////////////////////////////////////////////
// data logic

// song API's

// Database Clean up

// export const getGlobalSongs = async () => {
//   const songs = await AJAX("GET", `${API_URL}songs/global`);

//   console.log(songs.data[0].audioFile.data);
// };
// getGlobalSongs();

// For audio
// const blob = new Blob([arrayBuffer], { type: "audio/wav" });
// const url = window.URL.createObjectURL(blob);
// audioElement.src = url;

// TRASH

// const { imgFile, audioFile } = formData;
// fileData.append("imgFile", imgFile);
// fileData.append("audioFile", audioFile);

// const { songTitle, singer, language } = formData;
// await AJAX("POST", `${API_URL}song/new-song`, {
//   songTitle,
//   singer,
//   language,
// });
// Remove after Fetching data of bookmarks(Created just for demonstration)
// const globalSongs = await AJAX("GET", `${API_URL}songs/global`);

// console.log(globalSongs);
// console.log(songs.data[0].audioFile.data);

// const songs = await [...global, ...mySongs];

// let favourite = [];
// songs.forEach((song) => {
//   if (song.bookmarked) {
//     favourite.push(song);
//   }
// });

// Depricated
// export const toggleBookmark = function (e) {
//   const clickedSong = e.target.closest('.song-item');
//   const bookmark = e.target.classList.contains('book');

//   if (!bookmark) return;

//   const song = state.songs.find(song => song.id === +clickedSong.dataset.id);

//   if (e.target.classList.contains('mark')) {
//     song.bookmarked = true;
//   }
//   if (e.target.classList.contains('mark-show')) {
//     song.bookmarked = false;
//   }
// };

// const playlistName = await state.currPlaylist;
// const currPlaylist = await state.playlists[playlistName];

// const index = currPlaylist.findIndex((song) => song.id === songId);
// if (index <= -1) return;
// currPlaylist.splice(index, 1);
