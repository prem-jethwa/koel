import view from "../View.js";
import Validator from "../../../validator.js";

class AddSongView extends view {
  constructor() {
    super();
    this._parentEl = document.querySelector(".add-song_form");
    this._addSongFormContainer = document.querySelector(
      ".add-song-container_form"
    );
    this._addSongForm = document.querySelector(".form-for_add-song");
    this._addSongBtn = document.querySelector(".add-song");
    this._formEl = document.querySelector(".add-song_inputs");

    this.message = "Search for Songs...";
  }

  _openForm() {
    this._showContent(this._modalWin);
    this._showContent(this._addSongForm);
  }
  _closeForm() {
    this._hideContent(this._modalWin);
    this._hideContent(this._addSongForm);
  }

  _clearInputs() {
    const inputs = [...this._parentEl.querySelectorAll("input")];
    this._parentEl.querySelector("select").value = "";
    return inputs.map((input) => (input.value = ""));
  }

  _closeFormByEl(...elements) {
    elements.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".add-song_form") && !e.target.closest(".discard"))
          return;
        this._closeForm();
        this._clearInputs();
      });
    });
  }

  // Song validtion
  _removeErrorFormEl() {
    const audioFileEl = document.querySelector(
      '#form-el input[name="audioFile"]'
    );
    const imgFileEl = document.querySelector('#form-el input[name="imgFile"]');
    this._showSuccess(audioFileEl);
    this._showSuccess(imgFileEl);
  }

  _validateSong(formData) {
    // Elements
    const audioFileEl = document.querySelector(
      '#form-el input[name="audioFile"]'
    );
    const imgFileEl = document.querySelector('#form-el input[name="imgFile"]');

    // Values
    const audioFileName = formData.audioFile.name;
    const audioFileSize = formData.audioFile.size;
    const imgFileName = formData.imgFile.name;
    const imgFileSize = formData.imgFile.size;

    if (!Validator.isAudioFile(audioFileName, audioFileSize))
      return this._showError(
        audioFileEl,
        "Audio file must be .mp3 or .wav, under 3mb"
      );
    else this._showSuccess(audioFileEl);

    if (imgFileName) {
      if (!Validator.isImageValid(imgFileName, imgFileSize))
        return this._showError(
          imgFileEl,
          "Image must be .png or .jpg, under 1mb"
        );
      else this._showSuccess(imgFileEl);
    }

    if (!formData.songTitle) {
      formData.songTitle = audioFileName.split(".")[0];
    }

    return formData;
  }

  addHandlerOpenForm(handler) {
    this._addSongBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const msg = handler();
      if (msg && msg[0]) return this.renderNotification(msg[0], msg[1]);

      this._removeErrorFormEl();
      this._openForm();
    });
  }

  addHandlerCloseForm() {
    this._closeFormByEl(this._modalWin, this._addSongFormContainer);
  }

  addHandlerAddSongData(handler) {
    this._formEl.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formArr = await [...new FormData(this._formEl)];
      const formData = Object.fromEntries(formArr);

      const validSong = await this._validateSong(formData);

      if (!validSong) return;

      this._closeForm();
      this._clearInputs();
      await handler(validSong);
    });
  }
}

export default new AddSongView();
