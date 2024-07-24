import { getCommentsListFragment } from './comments.js';

const modalEl = document.querySelector('.big-picture');
const closeModalEl = modalEl.querySelector('#picture-cancel');
const commentsLoadBtn = modalEl.querySelector('.comments-loader');
const AMOUNT_COMMENTS_PER_CHUNK = 5;
let modalComments = [];
let commentsOffset = 0;


const closePictureModal = () => {
  commentsLoadBtn.classList.remove('hidden');
  modalEl.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscapeKeyDown = (e) => {
  if (e.key === 'Escape') {
    closePictureModal();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const appendCommentsChunk = () => {
  const commentsChunk = modalComments.slice(commentsOffset, commentsOffset + AMOUNT_COMMENTS_PER_CHUNK);

  if (commentsChunk.length > 0) {
    modalEl.querySelector('.social__comments').append(getCommentsListFragment(commentsChunk));
  }

  commentsOffset += Math.min(commentsChunk.length, AMOUNT_COMMENTS_PER_CHUNK);
  modalEl.querySelector('.social__comment-shown-count').textContent = commentsOffset;

  if (commentsOffset >= modalComments.length) {
    commentsLoadBtn.classList.add('hidden');
  }
};

const openPictureModal = (url, description, likes, comments) => {
  commentsOffset = 0;
  modalComments = comments;

  modalEl.querySelector('.big-picture__img img').src = url;
  modalEl.querySelector('.social__caption').textContent = description;
  modalEl.querySelector('.likes-count').textContent = likes;

  modalEl.querySelector('.social__comment-total-count').textContent = comments.length;
  modalEl.querySelector('.social__comments').innerHTML = '';
  appendCommentsChunk();

  modalEl.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeyDown);
};

commentsLoadBtn.addEventListener('click', () => appendCommentsChunk());
closeModalEl.addEventListener('click', () => closePictureModal());

export { openPictureModal };