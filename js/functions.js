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


function isCorrectMeetingTime(startDay, endDay, startMeeting, duration) {
  const startDateTime = getDateTimeFromTimeString(startDay);
  const endDayDateTime = getDateTimeFromTimeString(endDay);
  const startMeetingDateTime = getDateTimeFromTimeString(startMeeting);

  return startDateTime <= startMeetingDateTime &&
    addMinutesToDateTime(startMeetingDateTime, duration) <= endDayDateTime;
}

function getDateTimeFromTimeString(timeString) {
  const timeParts = timeString.split(':');
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), timeParts[0], timeParts[1]);
}

function addMinutesToDateTime(dateTime, minutes) {
  return new Date(dateTime.getTime() + minutes * 60 * 1000);
}

isCorrectMeetingTime('08:00', '17:30', '14:00', 90); // true
isCorrectMeetingTime('8:0', '10:0', '8:0', 120); // true
isCorrectMeetingTime('08:00', '14:30', '14:00', 90); // false
isCorrectMeetingTime('14:00', '17:30', '08:0', 90); // false
isCorrectMeetingTime('8:00', '17:30', '08:00', 900); // false
