import View from "../View.js";

class LoginView extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector(".btn-login");
    this._userDetailsContainer = document.querySelector(
      ".user-details_container"
    );
    this._user = {};
  }

  setAvatar(imgUrl) {
    if (!imgUrl) return;
    const userAvatar = document.querySelector(".user-svg");

    userAvatar.src = imgUrl;
    userAvatar.style.border = "2px solid var(--pri-border)"; //var(--pri-border) rgba(0, 0, 0, 0.505)
    userAvatar.style.boxShadow = " 0px 0px 8px -1px rgba(0, 0, 0, 0.8)";
  }

  _openUserDetails() {
    this._showContent(this._modalWin);
    this._showContent(this._userDetailsContainer);
  }

  _closeUserDetails() {
    if (!this._userDetailsContainer) return;
    this._hideContent(this._userDetailsContainer);
    this._hideContent(this._modalWin);
  }

  renderLogin() {
    this.clear();
    this._closeUserDetails();
    this._user = {};
    const markup = `
      <a href="./Login-Form/login-form.html">LOGIN</a>
    `;
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  // handlers
  addHandlerOpenUserDetails() {
    if (!this._parentEl.firstChild) return;

    // this._userDetailsContainer = this._parentEl;

    this._parentEl.addEventListener("click", (e) => {
      const userDetailsCon = this._parentEl.querySelector(
        ".user-details_container"
      );

      this._userDetailsContainer = userDetailsCon;
      if (
        e.target.closest(".user-details_container") ||
        e.target.closest(".update-btn")
      )
        return;

      if (!this._user) return;
      this._renderUserDetails(this._user);

      this._openUserDetails();
    });
  }

  addHandlerCloseUserDetails() {
    if (!this._parentEl) return;

    this._parentEl.addEventListener("click", (e) => {
      if (e.target.closest(".close-btn")) return this._closeUserDetails();
      if (
        !e.target.classList.contains("user-details_container") ||
        e.target.closest(".user-details")
      )
        return; //&& !e.target.closest('.cancel-btn')
      this._closeUserDetails();
    });

    this._modalWin.addEventListener("click", () => {
      this._closeUserDetails();
    });
    // this._closeUserDetailsByEl(this._modalWin);
  }

  addHandlerLogoutAndUpdate(handler) {
    // if (!this._userDetailsContainer) return;

    this._parentEl.addEventListener("click", (e) => {
      const logoutBtn = e.target.closest(".logout-btn");
      const updateBtn = e.target.closest(".update-btn");

      if (!logoutBtn && !updateBtn) return;

      handler(logoutBtn || updateBtn);
    });
  }

  _getMarkup(data) {
    return `
    <div class="user-details">
      <img src="${data.avatarUrl || "./public/icons/user.svg"}"> 
      <div class="close-btn">
        <img src="./public/icons/cancel.svg" alt="">
      </div>     
      <p><span>Name:</span> ${data.name}</p>
      <p><span>Email:</span> ${data.email}</p>
      <div class="user-details_btns flex-container">
          <div class="btn logout-btn">Logout</div>
          <div class="update-btn btn">Update</div>
      </div>
     </div>
    `;
  }
  _genarateMarkup(userData) {
    this._user = userData;
    if (!userData) this.renderLogin();
    return `
    <img class="user-svg" src="./public/icons/user.svg"> 
    <div class="user-details_container hidden">
      ${this._getMarkup(userData)}
    </div>
      `;
    l;
  }
  _renderUserDetails(data) {
    const userDetailsCon = this._parentEl.querySelector(
      ".user-details_container"
    );
    userDetailsCon.innerHTML = "";

    const markup = this._getMarkup(data);

    userDetailsCon.insertAdjacentHTML("beforeend", markup);
  }
}

export default new LoginView();
