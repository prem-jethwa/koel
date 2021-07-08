import Validator from '../../../validator.js';

class View {
  constructor() {
    this._parentEl = document.querySelector('.login-form_container');
  }

  renderSpinner() {
    this._clear();
    const html = `<div class="lds-dual-ring"></div>`;

    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  renderMsg(msg = this._message, type = 'error') {
    const color = type === 'error' ? 'var(--error)' : 'var(--success)';

    const duration = msg.split(' ').length;
    const html = `
                <div class="msg-container" style="animation-duration:${duration}s">
                    <div class="msg" style="background:${color}">${msg}</div>
                </div>
                `;
    document.body.insertAdjacentHTML('afterbegin', html);
    return type === 'error' ? false : true;
  }

  renderForm() {
    this._clear();
    const html = this._markup();

    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  _showError(input, msg) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = msg;
  }

  _showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  _validateLogin(formData) {
    // Elements
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    // Values
    const email = formData.email;
    const password = formData.password;

    // LOGIN validation
    if (!Validator.isEmail(email)) return this._showError(emailEl, 'Invalid Email Address');
    // else this._showSuccess();

    // if (!Validator.checkMinLength(password, 7))
    //   return this._showError(passwordEl, 'Password Must Be Greater Then 7 character');
    // else this._showSuccess();

    if (!Validator.checkMinLength(password, 7)) return this.renderMsg('Invalid Email OR Password');

    return formData;
  }

  _validateSignin(formData) {
    // Elements
    const emailEl = document.getElementById('email');
    const userNameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const password2El = document.getElementById('password2');
    // Values
    const email = formData.email;
    const name = formData.userName;
    const password = formData.password;
    const password2 = formData.password2;
    const avatar = formData.avatar;

    // validation
    if (!Validator.checkMaxLength(name, 20))
      return this._showError(userNameEl, 'Name Must Be Less Then 20 character');
    else this._showSuccess(userNameEl);

    if (!Validator.checkMinLength(name, 3))
      return this._showError(userNameEl, 'Name Must Be Greater Then 3 character');
    else this._showSuccess(userNameEl);

    if (!Validator.isEmail(email)) return this._showError(emailEl, 'Invalid Email Address');
    else this._showSuccess(emailEl);

    if (!Validator.checkMinLength(password, 7))
      return this._showError(passwordEl, 'Password Must Be Greater Then 7 character');
    else this._showSuccess(passwordEl);

    if (!Validator.isPasswordMatch(password, password2))
      return this._showError(password2El, 'Password Does not Match');
    else this._showSuccess(password2El);

    const validData = {
      name,
      email,
      password,
      avatar,
    };
    return validData;
  }

  addHandlerFormData(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const formType = e.target.querySelector('button[type = "submit"]').id;
      const formArr = [...new FormData(this._parentEl)];
      const formData = Object.fromEntries(formArr);

      if (formType === 'login') {
        const loginData = this._validateLogin(formData);
        return handler(formType, loginData);
      }

      const signinData = this._validateSignin(formData);

      handler(formType, signinData);
    });
  }

  addHandlerGotoBtn(handler) {
    this._parentEl.addEventListener('click', e => {
      const gotoBtn = e.target.closest('.goto');
      if (!gotoBtn) return;
      handler(gotoBtn.dataset.name);
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
  _clearInputs() {
    const inputs = this._parentEl.querySelectorAll('input');

    inputs.forEach(input => {
      input.value = '';
    });
  }
}

export default View;
