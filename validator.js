class Validator {
  constructor() {}

  isEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) return false;

    return true;
  }

  checkMinLength(val, min) {
    if (val.length < min) return false;

    return true;
  }

  checkMaxLength(val, max) {
    if (val.length > max) return false;

    return true;
  }

  isPasswordMatch(pass1, pass2) {
    if (pass1.trim() !== pass2.trim()) return false;

    return true;
  }

  isAudioFile(audioFileName, size) {
    if (!audioFileName.match(/\.(mp3|wav)$/)) return false;
    if (size && size > 4000000) return false;

    return true;
  }

  isImageValid(imgFileName, size) {
    if (!imgFileName.match(/\.(png|jpg)$/)) return false;
    if (size && size > 1000000) return false;

    return true;
  }
}

export default new Validator();
