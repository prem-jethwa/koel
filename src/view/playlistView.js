import view from "./View.js";

class PlaylistView extends view {
  constructor() {
    super();
    this._playlists = document.querySelector(".playlist");
    this._parentEl = document.querySelector(".ul-container");
    this._isSongDetailsOpen = false;
    this.message = "NO song found!";
    this._isMsgAdded = false;
  }

  _genarateMarkup(songs) {
    return songs
      .map((song) => {
        return `
        <li class="song-list" data-id="${song.id}">
        <div class="song-item">
          <img src="${
            song.imgFile ? song.imgFile : "./icons/playlist-song.png"
          }" alt="${song.artist}" class="song-img" />
          <div class="song-title marquee">
            <p class="song-title_marquee">
            ${this._genTitle(song.title)}
            </p>
          </div>
          <div class="song-item-btns">
            <div class="star">
              <img src="./icons/New/star${
                song.fav ? "" : "_border"
              }-24px.svg" alt="" class="star-svg book mark" />
            </div>
            <div class="play-pause">
              <img src="./icons/play.svg" alt="" class="play-pause-svg" />
            </div>
          </div>
        </div>
    
        <div class="hidden-content">
          <p>
            <span>Title:</span>
            ${song.title}
          </p>
          <p>
            <span>Singer:</span>
            ${song.artist}
          </p> 
          ${
            this._user.id === song.userId
              ? `<div class="song-icons flex-container">
                  <div class="delete btn"><img src="./icons/New/delete-24px.svg" alt="" /></div>
             </div>`
              : ""
          }
        </div>
      </li>
`;
      })
      .join("");
  }

  // <div class="user-icon btn">
  //     <img src="./icons/New/perm_identity-24px.svg" alt="" />
  // </div>

  // Not working!
  renderMessage(msg = this.message) {
    this.clear();
    const markup = `
        <li class="message">
             <h2>${msg}</h2>
        </li> 
      `;

    this._parentEl.insertAdjacentHTML("beforeend", markup);
    this._isMsgAdded = true;
  }

  setMsg(msg) {
    this.message = msg;
  }

  addHandlerPlayClickedSong(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const clickedSong = e.target.closest(".song-list");
      const playPauseBtn = e.target.closest(".play-pause-svg");
      const deleteEl = e.target.closest(".delete");
      const favBtn = e.target.closest(".star-svg");

      if (favBtn) return;

      if (!clickedSong) return;
      const hiddenContentEl = clickedSong.querySelector(".hidden-content");
      const allListItem = this._parentEl.querySelectorAll(".song-list");

      if (clickedSong && !playPauseBtn && !deleteEl) {
        allListItem.forEach((itemEl) => {
          if (clickedSong === itemEl) {
            if (hiddenContentEl.classList.contains("show-content")) {
              hiddenContentEl.classList.remove("show-content");
            } else {
              hiddenContentEl.classList.add("show-content");
            }
          }
          if (clickedSong !== itemEl) {
            itemEl
              .querySelector(".hidden-content")
              .classList.remove("show-content");
          }
        });
      }

      if (!playPauseBtn) return;

      const newsong = this._data.find(
        (song) => song.id === clickedSong.dataset.id
      );

      handler(e, newsong);
    });
  }

  setPlaySvg() {
    const allBtns = this._parentEl.querySelectorAll(".play-pause-svg");
    allBtns.forEach((btn) => (btn.src = "icons/play.svg"));
  }

  setPauseSvg(songId) {
    const songLists = [...this._parentEl.querySelectorAll(".song-list")];

    const songlist = songLists.find((list) => list.dataset.id === songId);

    if (!songlist) return;
    const btn = songlist.querySelector(".play-pause-svg");
    btn.src = "icons/pause.svg";
  }

  // setFav(songId, add = true) {
  //   const songLists = [...this._parentEl.querySelectorAll(".song-list")];

  //   const songlist = songLists.find((list) => list.dataset.id === songId);

  //   if (!songlist) return;
  //   const starImg = songlist.querySelector(".star img");
  //   starImg.src = `./icons/New/star${add ? "" : "_border"}-24px.svg`;
  // }

  // setUserIconInPlaylist(url) {
  //   const userIcon = this._parentEl.querySelector(".user-icon img");

  //   userIcon.src = url;
  // }

  addHandlerplaylistBtn(handler) {
    this._playlists.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest("button");
      const btnParent = btn.parentElement;
      const allBtns = [...btnParent.querySelectorAll("button")];

      allBtns.forEach((b) => {
        b.style.borderBottom = "";
        b.style.backgroundColor = "";
        if (b === btn) {
          b.style.borderBottom = "7px solid var(--border-color)";
          // b.style.backgroundColor = "var(--btn-hover)";
        }
      });

      // To add on state the selected Playlist
      handler(btn.name);
    });
  }

  addHandlerFavAndDelete(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const clickedSong = e.target.closest(".song-list");
      const deleteEl = e.target.closest(".delete");
      const favBtn = e.target.closest(".star-svg");

      if (!favBtn && !deleteEl) return;

      handler(clickedSong.dataset.id, favBtn ? "fav" : "del");
    });
  }
}

export default new PlaylistView();
