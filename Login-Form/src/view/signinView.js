import View from './View.js';
import Validator from '../../../validator.js';

class SiginView extends View {
  constructor() {
    super();
  }

  // addHandlerSetAvatar = function () {
  //   const imgInput = document.querySelector('.avatar');
  //   const img = document.querySelector('.avatar-img');

  //   document.addEventListener('change', async () => {
  //     const file = imgInput.files[0];
  //     if (!file) return;

  //     const imgName = file.name;
  //     const imgSize = file.size;

  //     if (!Validator.isImageValid(imgName, imgSize))
  //       return this.renderMsg('Image file must be .jpg, .jpeg or .png under 1mb.');

  //     // const buffer = await file.arrayBuffer();
  //     // console.log(buffer, file);

  //     // const imgDetails = {
  //     //   buffer,
  //     //   type: file.type,
  //     //   imgName,
  //     // };
  //     const url = URL.createObjectURL(file);
  //     console.log(url);
  //     localStorage.setItem('avatar', url);

  //     img.src = url;
  //   });
  // };

  /**
  // avatar markup
  <div class="avatar_container" title="Profile Picture">
          <img src="../icons/user.svg" style="cursor: pointer" class="avatar-img" />
          <div class="upload-svg_container">
            <img src="../icons/upload.svg" style="cursor: pointer" class="upload-svg" />
          </div>
          <input type="file" name="avatar" accept="image/*" capture class="avatar" />
   </div>
   */

  _markup() {
    return `

        <!-- LOGIN FORM -->

        <h2>Sign-in to song app</h2>

        <div class="form-control">
          <label for="username ">Name:</label>
          <input type="text" id="username" name="userName" placeholder="Enter Your Name" required />
          <small>Error message</small>
        </div>
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
        <div class="form-control">
          <label for="password2">Conform Password :</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Enter Password"
            required
          />
          <small>Error message</small>
        </div>
        <button type="submit" id="signin">Submit</button>
        <p class="goto" data-name="signin">All ready have a account LOGIN?</p>
    `;
  }
}

export default new SiginView();
