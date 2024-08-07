const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueIdGenerator = (min, max) => {
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
};

const getRandomValuesFromArray = (arr, amount) => {
  const values = [];

  while (values.length < amount && values.length !== arr.length) {
    const index = getRandomInteger(0, arr.length - 1);
    const value = arr[index];

    if (!values.includes(value)) {
      values.push(value);
    }
  }

  return values;
};

export { getRandomInteger, createUniqueIdGenerator, getRandomValuesFromArray };
