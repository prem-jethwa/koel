import View from "../View.js";
import Validator from "../../../validator.js";

class UpdateUserData extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector(".user-details_container");
    this._rootContainer = document.querySelector(".btn-login");
  }

  closeForm() {
    this._hideContent(this._parentEl);
    this._hideContent(this._modalWin);
  }
  addHandlerUpdateAvatar() {
    this._rootContainer.addEventListener("change", (e) => {
      const inputs = e.target.closest('input[type ="file"]');
      const img = this._rootContainer.querySelector(".avatar-img");
      if (!inputs) return;

      const file = inputs.files[0];
      const imgName = file.name;
      const imgSize = file.size;

      if (!Validator.isImageValid(imgName, imgSize)) {
        inputs.value = "";
        return this.renderNotification(
          "Image Size must be Under 1mb and formet must be .jpg, .jpeg and .png"
        );
      }

      img.src = URL.createObjectURL(file);
    });
  }

  _validateDetails(formData) {
    // // Elements
    const emailEl = document.querySelector(
      '.update-user_form input[name="email"]'
    );
    const passwordEl = document.querySelector(
      '.update-user_form input[name="password"]'
    );
    const CurrPasswordEl = document.querySelector(
      '.update-user_form input[name="currentPassword"]'
    );

    // Values
    const email = formData.email;
    const password = formData.password;
    const currPassword = formData.currPassword;

    // LOGIN validation
    if (email && !Validator.isEmail(email))
      return this._showError(emailEl, "Invalid Email Address");
    else this._showSuccess(emailEl);

    if (currPassword && !Validator.checkMinLength(currPassword, 7))
      return this._showError(
        CurrPasswordEl,
        "Password Must Be Greater Then 7 character"
      );
    else this._showSuccess(CurrPasswordEl);

    if (password && !Validator.checkMinLength(password, 7))
      return this._showError(
        passwordEl,
        "Password Must Be Greater Then 7 character"
      );
    else this._showSuccess(passwordEl);

    return formData;
  }

  addHandlerUpdateData(handler) {
    this._rootContainer.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = this._parentEl.querySelector("form");
      const formArr = [...new FormData(form)];
      const formData = Object.fromEntries(formArr);

      const validData = this._validateDetails(formData);

      if (!validData) return;
      handler(validData, validData.avatar);
    });
  }

  addHandlerCloseUpdateForm() {
    this._rootContainer.addEventListener("click", (e) => {
      const discard = e.target.closest(".update-discard_btn");

      if (!discard) return;

      this.closeForm();
    });
  }

  renderUpdateUserForm(userData) {
    const parentCon = this._rootContainer.querySelector(
      ".user-details_container"
    );
    this._parentEl = parentCon;

    parentCon.innerHTML = "";

    const markup = `
    <div class="user-details">
      <form class="update-user_form" enctype="multipart/form-data" >
        <div class="avatar_container" title="Profile Picture">
          <input type="file" name="avatar" accept="image/*" class="avatar" />
          <img src="${
            userData.avatarUrl || "public/icons/user.svg"
          }" style="cursor: pointer" class="avatar-img" />
          <div class="upload-svg_container">
              <img src="public/icons/upload.png" style="cursor: pointer" class="upload-svg" />
          </div>
        </div>
        
        <div class="form-control">
        <label for="name">Name:</label>
        <input type="text" name="name" value="${
          userData.name
        }" placeholder="Your Name"/>
        <small>Error message</small>
        </div>

        <div class="form-control">
        <label for="email">Email:</label>
        <input 
            type="text" 
            name="email" 
            value="${userData.email}" 
            placeholder="example@email.com" 
        />
        <small>Error message</small>
        </div>

        <div class="form-control">
        <label for="password">Current Password :</label>
        <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
        />
        <small>Error message</small>
        </div>
        
        <div class="form-control">
        <label for="password">Password :</label>
        <input
            type="password"
            name="password"
            placeholder="Update Password"
        />
        <small>Error message</small>
        </div>
        <div class="user-details_btns flex-container">
        <div><button type="button" class="update-discard_btn btn">Discard</button></div>
        <div><button type="submit" class="update-save_btn btn" data-btn-name="saveupdate">Save</button></div>
        </div>
    </form>
  </div>
    `;

    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
}

export default new UpdateUserData();
