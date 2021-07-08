import * as Helper from "./helpers.js";
import { HOME_URL, API_URL } from "../config.js";

export async function sendData(type, formData) {
  try {
    const { name, email, password } = formData;

    const sendData = {
      ...(type === "signin" && { name: name }),
      email,
      password,
    };

    const data = await Helper.sendUserData(`${API_URL}user/${type}`, sendData);

    if (type === "signin" && data.type === "error")
      throw Error("Email all ready taken, Try another one.");

    if (type === "login" && data.type === "error")
      throw Error("Inavlid Email OR Password!");

    const token = data.token;
    if (!token) return;

    localStorage.setItem("token", token);

    window.location.href = HOME_URL;
  } catch (err) {
    throw new Error(err);
  }
}

// (depricated)
// export const uploadAvatar = async function (imgFile) {
//   if (!imgFile) return;

//   const formData = new FormData();
//   formData.append('userAvatar', imgFile, imgFile.name);

//   const data = await Helper.UPLOAD_AJAX('POST', `${API_URL}avatar`, formData);
//   return data;
// };
