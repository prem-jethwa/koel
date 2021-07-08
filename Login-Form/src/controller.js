import SigninView from "./view/signinView.js";
import LoginView from "./view/loginView.js";
import * as model from "./model.js";

const checkView = function (type) {
  if (type === "signin") {
    return SigninView;
  }
  return LoginView;
};

async function controlFormData(type, formData) {
  const view = checkView(type);
  try {
    if (!formData) return;

    view.renderSpinner();
    const data = await model.sendData(type, formData);

    if (!data) return;
    if (data.type && data.type === "error") throw new Error(data.message);
  } catch (err) {
    view.renderForm();
    if (type === "login") return view.renderMsg("Invalid Password OR Email!");
    view.renderMsg(err.toString().replaceAll("Error:", ""));
    // console.log(err, view);
  }
}

function controlGotoClick(type) {
  if (type === "signin") return LoginView.renderForm();

  SigninView.renderForm();
}

function init() {
  // For both login and signin (to call one's)
  SigninView.addHandlerFormData(controlFormData);
  SigninView.addHandlerGotoBtn(controlGotoClick);

  // signinView.addHandlerSetAvatar();
}
init();

// (depricated)
// const imgName = formData.avatar.name;
// const imgSize = formData.avatar.size;
// if (imgName) {
//   // const data = await model.uploadAvatar(formData.avatar);
//   if (!Validator.isImageValid(imgName, imgSize))
//     return view.renderMsg('Image file must be .jpg, .jpeg or .png under 1mb.');
//   if (data.type && data.type === 'error') throw new Error(data.message);
// }
