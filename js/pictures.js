import { generateData } from './data.js';

const picturesData = generateData();
const container = document.querySelector('.pictures');
const pictureTmpl = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

picturesData.forEach((pictureData) => {
  const picture = pictureTmpl.cloneNode(true);
  picture.querySelector('.picture__img').src = pictureData.url;
  picture.querySelector('.picture__img').alt = pictureData.description;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picture.querySelector('.picture__comments').textContent = pictureData.comments.length;

  picturesFragment.append(picture);
});

container.append(picturesFragment);
