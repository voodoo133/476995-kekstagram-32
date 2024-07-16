import { generateData } from './data.js';

const renderPictures = () => {
  const picturesData = generateData();
  const containerEl = document.querySelector('.pictures');
  const pictureTmplEl = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach((pictureData) => {
    const pictureEl = pictureTmplEl.cloneNode(true);
    pictureEl.querySelector('.picture__img').src = pictureData.url;
    pictureEl.querySelector('.picture__img').alt = pictureData.description;
    pictureEl.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureEl.querySelector('.picture__comments').textContent = pictureData.comments.length;

    picturesFragment.append(pictureEl);
  });

  containerEl.append(picturesFragment);
};

export { renderPictures };


