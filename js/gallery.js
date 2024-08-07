import { getPictures } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { openPictureModal } from './picture-modal/picture-modal.js';

const errTmplEl = document.querySelector('#data-error').content.querySelector('.data-error');
const showErrorMsg = () => {
  const errEl = errTmplEl.cloneNode(true);
  document.body.append(errEl);

  setTimeout(() => errEl.remove(), 5000);
};

const makeGallery = () => {
  getPictures(
    (picturesData) => renderThumbnails(picturesData, openPictureModal),
    () => showErrorMsg()
  );
};

export { makeGallery };
