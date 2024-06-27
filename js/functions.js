const checkLength = (str, length) => str.length <= length;

checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false


function isPalindrome(str) {
  const cleanedStr = str.replaceAll(' ', '').toLowerCase();

  return [...cleanedStr].reverse().join('') === cleanedStr;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


function getPositiveNum(value) {
  if (typeof value === 'number') {
    value = value.toString();
  }

  return parseInt(value.replaceAll(/[^\d]+/g, ''), 10);
}

getPositiveNum('2023 год'); // 2023
getPositiveNum('ECMAScript 2022'); // 2022
getPositiveNum('1 кефир, 0.5 батона'); // 105
getPositiveNum('агент 007'); // 7
getPositiveNum('а я томат'); // NaN
getPositiveNum(2023); // 2023
getPositiveNum(-1); // 1
getPositiveNum(1.5); // 15
