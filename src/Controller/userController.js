import * as stateModel from "../Model/stateModel.js";
import * as userModel from "../Model/userModel.js";

import LoginView from "../view/header/loginView.js";
import UpdateUserData from "../view/header/updateUserData.js";

// LoadUiController
import {
  controlPlay,
  loadUi,
  renderUserDetails,
  loadSongIfExist,
  generatePaginationAndRenderPlaylist,
} from "./loadUiController.js";

export const logout = async function (ask = true) {
  if (ask) {
    const alertcleck = confirm("Are you sure want to Logout!!");
    if (!alertcleck) return;
  }
  await userModel.logoutUser();
  LoginView.renderLogin();

  await stateModel.loadSongPlaylistsState();
  await loadUi();
};

export const controlLogoutAndUpdate = function (btn) {
  const type = btn.innerText.toLowerCase();

  if (type === "update") {
    if (stateModel.state.user.email === "prem@dev.com")
      return UpdateUserData.renderNotification("Admin Data Cannot Be Update!");

    return UpdateUserData.renderUpdateUserForm(stateModel.state.user);
  }

  logout();
};

export const controlUpdateUserData = async function (formData, avatar) {
  if (!formData.currentPassword)
    return UpdateUserData.renderNotification("Current Password is Required!");

  try {
    UpdateUserData.renderSpinner();

    const data = await userModel.updateUser(formData);
    if (data.type && data.type === "error") throw new Error(data.message);

    if (avatar.name) {
      const avatarData = await userModel.uploadAvatar(avatar);
      if (avatarData.type && avatarData.type === "error")
        throw new Error(`Image ${avatarData.message}`);
      LoginView.setAvatar(avatar);
    }

    UpdateUserData.closeForm();
    UpdateUserData.renderNotification("Update Succesfully", "success");
    renderUserDetails();
  } catch (err) {
    console.log(err);
    UpdateUserData.renderNotification(err.toString());
    UpdateUserData.renderUpdateUserForm(stateModel.state.user);
  }
};
