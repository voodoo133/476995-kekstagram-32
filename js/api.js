const getPictures = (onSuccess, onError) =>
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));

const sendPicture = (formData, onSuccess, onError) =>
  fetch('https://32.javascript.htmlacademy.pro/kekstagra', { method: 'POST', body: formData })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      onSuccess();
    })
    .catch((err) => onError(err));

export { getPictures, sendPicture };
