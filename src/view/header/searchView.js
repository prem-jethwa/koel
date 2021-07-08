import View from "../View.js";

class SearchView extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector(".search-container");
    this._backToPlayListCon = document.querySelector(".back-to-playlist_Con");

    this._searchInput = document.querySelector(".input-search");
    this._displayResult = document.querySelector(".input-search_options");
    this._playlistCon = document.querySelector(".song-shotlist_container");
    this._language = document.getElementById("lang");
    this._currPara = 0;
    this._isArrowKeyPassedFirstPara = false;
    this._isBackToPlaylistBtnRender = false;
  }

  get checkBackToPlayBtn() {
    return this._isBackToPlaylistBtnRender;
  }

  _currParaChange(e, paraLength) {
    if (e.key === "ArrowDown") {
      if (this._currPara === paraLength) {
        this._currPara = 0;
      } else {
        this._currPara++;
      }
    }
    if (e.key === "ArrowUp") {
      if (this._currPara === 0) {
        this._currPara = paraLength;
      } else {
        this._currPara--;
      }
    }
  }

  addHandlerSearchByArrowKey(handler) {
    this._searchInput.addEventListener("keyup", (e) => {
      if (e.key !== "Enter")
        handler(this._searchInput.value, this._language.value);
      if (e.key === "Enter" && this._isArrowKeyPassedFirstPara) {
        const para = this._displayResult.querySelector(
          `.para${this._currPara}`
        );
        if (!para) return;

        this._searchInput.value = para.innerText.split(",")[0];
        handler(para.innerText, this._language.value, true);
      }

      if (e.keyCode !== 40 && e.keyCode !== 38) {
        this._isArrowKeyPassedFirstPara = false;
        return (this._currPara = 0);
      }

      const para = this._displayResult.querySelector(`.para${this._currPara}`);
      if (!para) return;
      const allPara = [...this._displayResult.querySelectorAll(`p`)];
      if (!allPara) return;

      allPara.map((p) => p.classList.remove("active-para"));

      if (this._currPara === 0 && !this._isArrowKeyPassedFirstPara) {
        allPara[this._currPara].classList.add("active-para");
        return (this._isArrowKeyPassedFirstPara = true);
      }

      this._currParaChange(e, allPara.length - 1);
      allPara[this._currPara].classList.add("active-para");
    });
  }

  addhandlerSearchByKeyword(handler) {
    this._searchInput.addEventListener("keyup", (e) => {
      const keyword = this._searchInput.value;
      if (!keyword || e.key === "Enter")
        return this._hideContent(this._displayResult);

      handler(keyword, this._language.value);
      this._showContent(this._displayResult);
    });
  }

  renderSearchResults(matchingSongs, val) {
    let html = matchingSongs
      .map((song, i) => {
        const regex = new RegExp(val, "gi");
        const titleMatch = song.title.replace(
          regex,
          `<span class="high-light" >${val}</span>`
        );
        const singerMatch = song.artist.replace(
          regex,
          `<span class="high-light" >${val}</span>`
        );

        return `<p class="para${i} para" data-index="${i}">${titleMatch.toLowerCase()}, ${singerMatch.toLowerCase()}</p>`;
      })
      .join("");

    if (!html) html = `<p class="no-song">No songs!!</p>`;

    this._displayResult.innerHTML = html;
  }

  setBackToPlaylist(val) {
    this._isBackToPlaylistBtnRender = val;
  }

  addhandlerSearchByFormSubmit(handler) {
    this._parentEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const val = this._searchInput.value;

      this._hideContent(this._displayResult);

      if (!val) return;
      handler(val, this._language.value, true);
    });
  }

  addHandlerSearchByClickOnResuls(handler) {
    this._displayResult.addEventListener("click", (e) => {
      const clickedPara = e.target.closest("p");

      if (clickedPara.classList.contains("no-song")) return;

      const titleText = clickedPara.innerText.split(",")[0];

      this._searchInput.value = titleText;
      this._hideContent(this._displayResult);
      handler(titleText, this._language.value, true);
    });
  }

  // Back TO playlist
  renderBackToPlaylistBtn() {
    if (this.checkBackToPlayBtn) return;
    const markup = `
    <div class="back-to-playlist_btn flex-container">
      <button><img src="public/icons/left-arrow.svg" alt="arrow"> Back To Playlist </button>
      <p> Search Results </p>
    </div>
    `;

    this.setBackToPlaylist(true);

    this._backToPlayListCon.insertAdjacentHTML("afterbegin", markup);
  }

  removeBackToPlaylistBtn() {
    const backToBtn = this._playlistCon.querySelector(".back-to-playlist_btn");
    this.setBackToPlaylist(false);
    backToBtn.remove();
  }

  addHandlerBackToPlaylist(handler) {
    this._playlistCon.addEventListener("click", (e) => {
      const backToBtn = e.target.closest(".back-to-playlist_btn button");
      if (!backToBtn) return;
      this.removeBackToPlaylistBtn();
      this._hideContent(this._displayResult);

      this._searchInput.value = "";
      handler();
    });
  }
}

export default new SearchView();

// trash

// allPara[this._currPara].style.backgroundColor = 'blue';

// para.style.backgroundColor = 'blue';
// this._stylePara(`para${this._currPara}`);

// const updateHtml = `<p class="para${this._currPara} active-para">${para.innerText}</p>`;
// this._displayResult.insertAdjacentHTML('beforeend', updateHtml);
// allPara[this._currPara].classList.replace('para', 'active-para');
