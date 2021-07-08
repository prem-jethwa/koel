import View from "./View.js";

class PlayView extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector(".song-play-container");
    this.playList = document.querySelector(".ul-container");
    this.title = document.getElementById("title");
    this.artist = document.getElementById("artist");
    this.currentTimeEl = document.getElementById("current-time");
    this.durationEl = document.getElementById("duration");
    this.progress = document.getElementById("progress");
    this.progressContainer = document.getElementById("progress-container");
    this.prevBtn = document.getElementById("prev");
    this.playBtn = document.getElementById("play");
    this.nextBtn = document.getElementById("next");

    this.music = document.querySelector("audio");
    this.image = document.querySelector(".player-img");
  }

  //   <audio controls>
  //   <source src="${""}" type="audio/mpeg">
  //   <source src="${""}" type="audio/ogg">
  // </audio>

  _genarateMarkup(song) {
    return `
          <div class="player-container">
            <!-- Song -->
            <div class="img-container">
              <img src="${song.imgFile}" alt="Album Art" class="player-img" />
            </div>
            <h2 id="title">${this._genTitle(song.title)}</h2>
            <h3 id="artist">${song.artist}</h3>
            <audio controls>
                <source src="${song.audioFile}" type="audio/mpeg">
                <source src="${song.audioFile}" type="audio/ogg">
            </audio>
            <div class="progress-container" id="progress-container">
              <div class="progress" id="progress"></div>
              <div class="duration-wrapper">
                <span id="current-time">0:00</span>
                <span id="duration">2:06</span>
              </div>
            </div>
            <!-- Controls -->
            <div class="player-controls">
              <img src="public/icons/skip_previous.svg" class="player-btn" id="prev" title="Previous" />
              <img src="public/icons/play.svg" class="player-btn" id="play" title="Play" />
              <img src="public/icons/skip_next.svg" class="player-btn" id="next" title="Next" />
            </div>
          </div>
    `;
  }

  playSong() {
    this.playBtn.src = `public/icons/pause.svg`;
    this.playBtn.setAttribute("title", "Pause");
    this.music.play();
  }

  renderPlayLoader() {
    this.playBtn.src = `public/icons/play-loader.svg`;
  }

  pauseSong() {
    this.playBtn.src = `public/icons/play.svg`;
    this.playBtn.setAttribute("title", "Play");
    this.music.pause();
  }

  async renderSong(song) {
    // const audioSources = [...this.music.querySelectorAll("source")];

    // console.log(audioSources);
    const loadedSong = await song;
    this.title.textContent = this._genTitle(loadedSong.title);
    this.artist.textContent = loadedSong.artist;
    this.music.src = await `${loadedSong.audioFile}`;
    // audioSources[0].src = audioSources[1] = await `${loadedSong.audioFile}`;

    // audioSources[0].type = "audio/mpeg";
    // audioSources[1].type = "audio/ogg";

    this.image.src = await `${
      loadedSong.imgFile ? loadedSong.imgFile : "./public/icons/song.png"
    }`;
    // this.pauseSong();
  }

  updateProgress(obj) {
    this.progress.style.width = obj.progressWidth;
    this.currentTimeEl.textContent = obj.currentTimeState;
    this.durationEl.textContent = obj.durationState;
  }

  setMusicTime(currTime) {
    this.music.currentTime = currTime;
  }

  getDuration() {
    return this.music.duration;
  }

  // handlers
  addHandlerProgressUpdate(handler) {
    this.progressContainer.addEventListener("click", function (e) {
      const width = this.clientWidth;
      handler(e, width);
    });
  }

  addHandlerPrevSong(handler) {
    this.prevBtn.addEventListener("click", handler);
  }

  addHandlerNextSong(handler) {
    this.nextBtn.addEventListener("click", handler);
  }

  addHandlerPlay(handler) {
    this.playBtn.addEventListener("click", handler);
  }

  addHandlerProgress(handler) {
    this.music.addEventListener("timeupdate", (e) => handler(e));
  }
}

export default new PlayView();
