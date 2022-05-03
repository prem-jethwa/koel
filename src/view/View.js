export default class View {
  constructor() {
    this._data;
    this._modalWin = document.querySelector(".modal-win");
    this._user = {};
  }
  /**
   * Render songs in UI
   * @param {[Object]} songs -> Array of objects contain all songs as object
   */
  render(data, saveToState = true) {
    if (saveToState) this._data = data;
    this.clear();

    //_genarateMarkup fun should be available in child class who is using render()
    const markup = this._genarateMarkup(data);

    if (data.length <= 0) this.renderMessage();

    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  setUser(user) {
    this._user = user;
  }

  // // // Not working!
  // renderMessage(msg = this.message) {
  //   this.clear();
  //   const markup = `
  //   <li class="message">
  //       <h2>${msg}</h2>
  //   </li>
  //   `;

  //   if (!this._isMsgAdded)
  //     this._parentEl.insertAdjacentHTML("beforeend", markup);

  //   this._isMsgAdded = true;
  // }

  renderNotification(msg, type = "error") {
    const color = type === "error" ? "var(--error)" : "var(--success)";

    const textLength = +msg.split(" ").length;
    const duration = textLength > 10 ? 5 : 3;

    const html = `
                <div class="msg-container" style="animation-duration:${duration}s">
                    <div class="msg" style="background:${color}">${msg}</div>
                </div>
                `;
    document.body.insertAdjacentHTML("afterbegin", html); //afterbegin
    return type === "error" ? false : true;
  }

  renderSpinner() {
    this.clear();
    // const html = `<div class="lds-dual-ring"></div>`;
    const html = "<h2> Loading... </h2>";

    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  _hideContent(el) {
    if (el.classList.contains("hidden")) return;
    el.classList.add("hidden");
  }

  _showContent(el) {
    if (!el.classList.contains("hidden")) return;
    el.classList.remove("hidden");
  }

  // Event handlers
  addHandlerBookmark(handler) {
    this.clear();
    this._parentEl.addEventListener("click", function (e) {
      handler(e);
    });
  }

  // addHandlerGlogalKeys(handler) {
  //   document.addEventListener('keydown', e => {
  //     if (e.key === ' ') {
  //       e.preventDefault();
  //       return handler();
  //     }
  //   });
  // }

  clear() {
    this._parentEl.innerHTML = "";
  }

  // setModelWinHeight() {
  //   this._parentEl.
  // }

  // form validation helpers

  _showError(input, msg) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = msg;
  }

  _showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control";
  }

  _genTitle = (title) => {
    let generatedTitle = title;
    const totalTitleLength = generatedTitle.split("").length;

    if (totalTitleLength > 25) {
      generatedTitle = `${title.slice(0, 25)}...`;
    }

    return generatedTitle.replace(/.mp3/g, "");
  };

  // addHanderOnUiLoad() {
  //   window.addEventListener("load", () => {
  //     body.innerHTML = `<div class="lds-dual-ring"></div>`;
  //   });
  // }
}
