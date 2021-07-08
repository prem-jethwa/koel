import {API_URL} from '../config.js';

export const sendUserData = async function (url, formData) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  return data;
};

// (depricated)
// export const UPLOAD_AJAX = async function (formData) {
//   const res = await fetch(`${API_URL}avatar`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'multipart/form-data',
//     },
//     body: formData,
//   });

//   const data = await res.json();

//   return data;
// };
