import { API_URL } from "./config.js";

// const token = localStorage.getItem('token');
export const AJAX = async function (method, url, formData) {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
      ...(method !== "GET" && { body: JSON.stringify(formData) }),
    });
    const data = await res.json();

    if (data.type === "error") throw new Error(data);
    return { data, status: res.status };
  } catch (err) {
    throw new Error(err);
  }
};

export const NO_DATA_AJAX = async (method, url) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status >= 400 && res.status < 500) throw new Error(data);

    return res.status;
  } catch (err) {
    throw new Error(err);
  }
};

export const UPLOAD_AJAX = async function (method, url, formData) {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSongPlaylist = async function (playlistName) {
  try {
    let global, mySongs, favourite;

    if (playlistName === "global") {
      global = await AJAX("GET", `${API_URL}songs/global`);
      return { global: global.data };
    }

    if (playlistName === "mySongs") {
      mySongs = await AJAX("GET", `${API_URL}songs/mysongs`);
      return { mySongs: mySongs.data };
    }

    if (playlistName === "fav") {
      favourite = await AJAX("GET", `${API_URL}songs/favourite`);
      return { favourite: favourite.data };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllPlaylists = async () => {
  try {
    const playlists = Promise.all([
      await AJAX("GET", `${API_URL}songs/global`),
      await AJAX("GET", `${API_URL}songs/mysongs`),
      await AJAX("GET", `${API_URL}songs/favourite`),
    ]);

    const allPlaylists = await playlists;

    return {
      global: await allPlaylists[0].data,
      mySongs: await allPlaylists[1].data,
      favourite: await allPlaylists[2].data,
    };
  } catch (err) {
    throw Error(err);
  }
};

export const setFavSongs = (playlist, favPlaylist) => {
  playlist.map((song) => {
    const isFav = favPlaylist.some((favSong) => favSong.id === song.id);

    song.fav = isFav;
  });
  favPlaylist.map((song) => {
    song.fav = true;
  });
};

export const getImgUrl = (imgArrBuffer) => {
  let TYPED_ARRAY = new Uint8Array(imgArrBuffer);
  const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
  let base64String = btoa(STRING_CHAR);

  return `data:image/jpg;base64,${base64String}`;
};

const audioBufferTObase64 = async (audioBuffer) => {
  let binary = "";
  let bytes = new Uint8Array(audioBuffer);

  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return `data:audio/ogg;base64,${await btoa(binary)}`;
};

export const formatSong = async (song, withAudio = false) => {
  return {
    id: song.data.id,
    artist: song.data.artist,
    language: song.data.language,
    title: song.data.title,
    userId: song.data.userId,
    ...(withAudio && {
      audioFile: await audioBufferTObase64(await song.data.audioFile.data),
    }),
    ...(song.data.imgFile && { imgFile: getImgUrl(song.data.imgFile) }),
  };
};

// return {
//   global: global.data,
//   mySongs: mySongs.data,
//   favourite: favourite.data,
//   audioBufferTObase64,
// };

// export const audioBufferTObase64 = (audioBuffer) => {
//   var base64String = btoa(
//     String.fromCharCode.apply(null, new Uint8Array(audioBuffer))
//   );
//   return `data:audio/ogg;base64,${base64String}`;
// };
