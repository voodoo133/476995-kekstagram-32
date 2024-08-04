const VALID_HASTAG_REGEX = /^#[0-9a-zа-яё]{1,19}$/i;
const MAX_AMOUNT_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const formEl = document.querySelector('#upload-select-image');
const fileInputEl = formEl.querySelector('#upload-file');
const hashtagsEl = formEl.querySelector('input[name="hashtags"]');
const commentEl = formEl.querySelector('textarea[name="description"]');
//const formSubmitBtn = formEl.querySelector('#upload-submit');
const editPhotoModalEl = formEl.querySelector('.img-upload__overlay');
const editPhotoModalCloseEl = editPhotoModalEl.querySelector('.img-upload__cancel');
const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeEditPhotoModal = () => {
  editPhotoModalEl.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInputEl.value = '';
};

const onEscapeKeyDown = (e) => {
  if (e.key === 'Escape' && document.activeElement !== hashtagsEl && document.activeElement !== commentEl) {
    closeEditPhotoModal();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const openEditPhotoModal = () => {
  editPhotoModalEl.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeyDown);
};

const checkHashtagsToCorrect = (value) => {
  const trimmedValue = value.trim();
  // Если ничего не введено, то всё норм.
  // Считаем, что валидация удалась, т.к. поле заполнять необязательно
  if (trimmedValue.length === 0) {
    return true;
  }

  const hashtags = trimmedValue.split(' ');

  return hashtags.every((ht) => VALID_HASTAG_REGEX.test(ht));
};

const checkUniqueHashtags = (value) => {
  const hashtags = value.trim().split(' ');
  const uniqueHashtags = new Set(hashtags.map((ht) => ht.toLowerCase()));

  return hashtags.length === uniqueHashtags.size;
};

const checkAmountHashtags = (value) => value.trim().split(' ').length <= MAX_AMOUNT_HASHTAGS;

const checkCommentLength = (value) => value.trim().length <= MAX_COMMENT_LENGTH;

const initValidateRules = () => {
  pristine.addValidator(hashtagsEl, checkHashtagsToCorrect, 'Введён невалидный хэштег');
  pristine.addValidator(hashtagsEl, checkUniqueHashtags, 'Присутствуют неуникальные хэштеги');
  pristine.addValidator(hashtagsEl, checkAmountHashtags, 'Превышено количество хэштегов');
  pristine.addValidator(commentEl, checkCommentLength, 'Комментарий не может быть больше 140 символов');
};

const onFormSubmit = (e) => {
  //formSubmitBtn.disabled = true;

  e.preventDefault();
  pristine.validate();
};

const initUploadForm = () => {
  fileInputEl.addEventListener('change', openEditPhotoModal);
  editPhotoModalCloseEl.addEventListener('click', closeEditPhotoModal);
  initValidateRules();
  formEl.addEventListener('submit', onFormSubmit);
};

export { initUploadForm };
