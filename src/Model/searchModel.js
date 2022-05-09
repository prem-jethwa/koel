// import { API_URL, DEFALULT_PLAYLIST, PER_PAGE } from "./config.js";
// import {
//   AJAX,
//   getAllPlaylists,
//   getSongPlaylist,
//   getImgUrl,
//   UPLOAD_AJAX,
//   setFavSongs,
//   NO_DATA_AJAX,
// } from "../helpers.js";

import { state } from "./stateModel.js";

function removedSpecialChar(songs) {
  const remChar = songs.filter((song) => {
    const removedSpecialChar = song.title
      .replace("mp3", "")
      .replace(/[!@#$%^&*(),.?":{}|<>]/g, "");

    return (song.title = removedSpecialChar);
  });
  return remChar;
}

async function getMatchLanguageSong(language, playlist) {
  const matchSongs = await playlist.filter((song) => {
    if (song.language === language) {
      return song;
    }
  });
  if (!matchSongs) return console.log("no songs");

  return matchSongs;
}

export async function getMatchingResults(keyword, language = "Language") {
  const currPlaylist = await state.playlists[state.currPlaylist];

  const removedChar = removedSpecialChar([...currPlaylist]);

  let languageMatchSongs = await removedChar;

  if (language !== "Language") {
    languageMatchSongs = await getMatchLanguageSong(language, removedChar);
  }

  const searchInputMatch = languageMatchSongs.filter((song) => {
    const regex = new RegExp(keyword, "gi"); // imp.
    const matchWithTitle = song.title.match(regex);
    const matchWithArtist = song.artist.match(regex);

    return matchWithArtist || matchWithTitle;
  });

  return searchInputMatch;
}
