import { getRandomInteger, createUniqueIdGenerator, getRandomValuesFromArray } from './util.js';

const generatePhotoDescription = () => {
  const DESCRIPTIONS = [
    'Тут я был', 'Тут я хочу побывать', 'Тут меня приняли росгвардейцы',
    'Тут я провел ночь', 'Тут-тут-тут', 'Тут выступала группа Тутси',
    'Тут нос утрут', 'Тут обитает спрут', 'Тут мать продадут',
    'Тут group loot', 'Тут далеко шлют', 'Тут глубокий омут'
  ];

  return getRandomValuesFromArray(DESCRIPTIONS, 1).toString();
};

const generateCommentMessage = () => {
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const msgArr = getRandomValuesFromArray(MESSAGES, getRandomInteger(1, 2));

  return msgArr.join(' ');
};

const generateCommentAuthorName = () => {
  const NAMES = ['Астра', 'Аэлита', 'Вевея', 'Византия', 'Вишня', 'Блуд',
    'Боян', 'Воин', 'Горислав', 'Господин', 'Громобой'
  ];

  return getRandomValuesFromArray(NAMES, 1).toString();
};

const generateComments = (generateUniquePhotoId) => {
  const maxAmountComments = getRandomInteger(0, 30);

  const comments = [];
  for (let i = 0; i < maxAmountComments; i++) {
    const commentId = generateUniquePhotoId();
    if (commentId === null) {
      break;
    }
    const avatarId = getRandomInteger(1, 6);

    comments.push({
      id: commentId,
      avatar: `img/avatar-${avatarId}.svg`,
      message: generateCommentMessage(),
      name: generateCommentAuthorName(),
    });
  }

  return comments;
};

const createPhoto = (generateUniquePhotoId, generateUniquePhotoUrlId, generateUniqueCommentId) => {
  const photoId = generateUniquePhotoId();
  if (photoId === null) {
    throw new Error('Уникальные id для фото закончились');
  }

  const photoUrlId = generateUniquePhotoUrlId();
  if (photoUrlId === null) {
    throw new Error('Уникальные id для адресов фотографий закончились');
  }

  return {
    id: photoId,
    url: `photos/${photoUrlId}.jpg`,
    description: generatePhotoDescription(),
    likes: getRandomInteger(15, 200),
    comments: generateComments(generateUniqueCommentId)
  };
};

const generateData = () => {
  const PHOTO_ID_CONSTRAINS = { MIN: 1, MAX: 25 };
  const PHOTO_URL_ID_CONSTRAINS = { MIN: 1, MAX: 25 };
  const COMMENT_ID_CONSTRAINS = { MIN: 1, MAX: 1000 };
  const generateUniquePhotoId = createUniqueIdGenerator(PHOTO_ID_CONSTRAINS.MIN, PHOTO_ID_CONSTRAINS.MAX);
  const generateUniquePhotoUrlId = createUniqueIdGenerator(PHOTO_URL_ID_CONSTRAINS.MIN, PHOTO_URL_ID_CONSTRAINS.MAX);
  const generateUniqueCommentId = createUniqueIdGenerator(COMMENT_ID_CONSTRAINS.MIN, COMMENT_ID_CONSTRAINS.MAX);

  const data = [];
  for (let i = PHOTO_ID_CONSTRAINS.MIN; i <= PHOTO_ID_CONSTRAINS.MAX; i++) {
    data.push(createPhoto(generateUniquePhotoId, generateUniquePhotoUrlId, generateUniqueCommentId));
  }

  return data.filter((p) => p !== null);
};

export { generateData };
