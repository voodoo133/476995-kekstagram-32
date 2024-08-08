const renderThumbnails = (picturesData, onClickCallback) => {
  const containerEl = document.querySelector('.pictures');
  const pictureTmplEl = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach(({ url, description, likes, comments }) => {
    const pictureEl = pictureTmplEl.cloneNode(true);
    pictureEl.querySelector('.picture__img').src = url;
    pictureEl.querySelector('.picture__img').alt = description;
    pictureEl.querySelector('.picture__likes').textContent = likes;
    pictureEl.querySelector('.picture__comments').textContent = comments.length;

    pictureEl.addEventListener('click', () => onClickCallback(url, description, likes, comments));

    picturesFragment.append(pictureEl);
  });

  Array.from(containerEl.querySelectorAll('.picture')).forEach((picEl) => picEl.remove());
  containerEl.append(picturesFragment);
};

export { renderThumbnails };


