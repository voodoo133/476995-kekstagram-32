import { getCommentsListFragment } from './comments.js';

const modalEl = document.querySelector('.big-picture');
const closeModalEl = modalEl.querySelector('#picture-cancel');

const closePictureModal = () => {
  modalEl.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscapeKeyDown = (e) => {
  if (e.key === 'Escape') {
    closePictureModal();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const openPictureModal = (url, description, likes, comments) => {
  modalEl.querySelector('.big-picture__img img').src = url;
  modalEl.querySelector('.social__caption').textContent = description;
  modalEl.querySelector('.likes-count').textContent = likes;
  modalEl
    .querySelector('.social__comment-shown-count')
    .textContent = modalEl.querySelector('.social__comment-shown-count').textContent;
  modalEl.querySelector('.social__comment-total-count').textContent = comments.length;
  modalEl.querySelector('.social__comments').innerHTML = '';
  modalEl.querySelector('.social__comments').append(getCommentsListFragment(comments));

  modalEl.querySelector('.social__comment-count').classList.add('hidden');
  modalEl.querySelector('.comments-loader').classList.add('hidden');
  modalEl.classList.remove('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeyDown);
};

closeModalEl.addEventListener('click', () => closePictureModal());

export { openPictureModal };
