function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createUniqueIdGenerator(min, max) {
  const previousIds = [];

  return function () {
    if (previousIds.length >= max - min + 1) {
      return null;
    }

    let id = getRandomInteger(min, max);

    while (previousIds.includes(id)) {
      id = getRandomInteger(min, max);
    }

    previousIds.push(id);
    return id;
  };
}

function getRandomValueFromArray(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

function generatePhotoDescription() {
  const DESCRIPTIONS = [
    'Тут я был', 'Тут я хочу побывать', 'Тут меня приняли росгвардейцы',
    'Тут я провел ночь', 'Тут-тут-тут', 'Тут выступала группа Тутси',
    'Тут нос утрут', 'Тут обитает спрут', 'Тут мать продадут',
    'Тут group loot', 'Тут далеко шлют', 'Тут глубокий омут'
  ];

  return getRandomValueFromArray(DESCRIPTIONS);
}

function generateCommentMessage() {
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  return getRandomValueFromArray(MESSAGES);
}

function generateCommentAuthorName() {
  const NAMES = ['Астра', 'Аэлита', 'Вевея', 'Византия', 'Вишня', 'Блуд',
    'Боян', 'Воин', 'Горислав', 'Господин', 'Громобой'
  ];

  return getRandomValueFromArray(NAMES);
}

function generateComments(generateUniquePhotoId) {
  const maxAmountComments = getRandomInteger(0, 30);

  const comments = [];
  for (let i = 0; i < maxAmountComments; i++) {
    const commentId = generateUniquePhotoId();
    if (commentId === null) {
      break;
    }
    const avatarId = getRandomInteger(0, 6);

    comments.push({
      id: commentId,
      avatar: `img/avatar-${avatarId}.svg`,
      message: generateCommentMessage(),
      name: generateCommentAuthorName(),
    });
  }

  return comments;
}

function createPhoto(generateUniquePhotoId, generateUniquePhotoUrlId, generateUniqueCommentId) {
  const photoId = generateUniquePhotoId();
  if (photoId === null) {
    return null;
  }

  const photoUrlId = generateUniquePhotoUrlId();
  if (photoUrlId === null) {
    return null;
  }

  return {
    id: photoId,
    url: `photos/${photoUrlId}.jpg`,
    description: generatePhotoDescription(),
    likes: getRandomInteger(15, 200),
    comments: generateComments(generateUniqueCommentId)
  };
}

function generateData() {
  const PHOTO_ID_CONSTRAINS = { MIN: 1, MAX: 25 };
  const PHOTO_URL_ID_CONSTRAINS = { MIN: 1, MAX: 25 };
  const COMMENT_ID_CONSTRAINS = { MIN: 1, MAX: 1000 };
  const generateUniquePhotoId = createUniqueIdGenerator(PHOTO_ID_CONSTRAINS.MIN, PHOTO_ID_CONSTRAINS.MAX);
  const generateUniquePhotoUrlId = createUniqueIdGenerator(PHOTO_URL_ID_CONSTRAINS.MIN, PHOTO_URL_ID_CONSTRAINS.MAX);
  const generateUniqueCommentId = createUniqueIdGenerator(COMMENT_ID_CONSTRAINS.MIN, COMMENT_ID_CONSTRAINS.MAX);

  const data = [];

  for (let i = PHOTO_ID_CONSTRAINS.MIN; i <= PHOTO_ID_CONSTRAINS.MAX; i++) {
    data.push(
      createPhoto(generateUniquePhotoId, generateUniquePhotoUrlId, generateUniqueCommentId)
    );
  }

  return data;
}

generateData();
// console.log(generateData());
