const commentTmplEl = document.querySelector('#comment').content.querySelector('.social__comment');

const getCommentsListFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, message, name }) => {
    const commentEl = commentTmplEl.cloneNode(true);
    commentEl.querySelector('.social__picture').src = avatar;
    commentEl.querySelector('.social__picture').alt = name;
    commentEl.querySelector('.social__text').textContent = message;

    commentsFragment.append(commentEl);
  });

  return commentsFragment;
};

export { getCommentsListFragment };
