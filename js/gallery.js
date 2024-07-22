import { generateData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openPictureModal } from './picture-modal/picture-modal.js';

const makeGallery = () => {
  const picturesData = generateData();
  renderThumbnails(picturesData, openPictureModal);
};

export { makeGallery };
