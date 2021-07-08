import View from './View.js';

class LoginView extends View {
  constructor() {
    super();
  }
  // <h2> Welcome back to song app</h2>
  _markup() {
    return `
    <h2> Login </h2>
      <div class="form-control">
        <label for="useremail">Email Id:</label>
        <input type="text" id="email" name="email" placeholder="Enter Email Address" required />
        <small>Error message</small>
      </div>
      <div class="form-control">
        <label for="password">Password :</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        <small>Error message</small>
      </div>
      <button type="submit" id="login">Submit</button>
      <p class="goto" data-name="login">Don't have account Sign-in?</p>
    `;
  }
}

export default new LoginView();
