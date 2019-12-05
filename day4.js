
function solution(input) {
  input = input.split('-');
  let currentNum = input[0];
  let counter = 0;

  while(currentNum <= input[1]) {
    if (checkForAnswerV2(currentNum)) {
      ++counter;
    }
    ++currentNum;
  }
  return counter;
}

// Part 1
function checkForAnswerV1(number) {
  number = number.toString();
  let prev = number[0];
  let doubleChecked = false;
  for (let i = 1; i < number.length; ++i) {
    if (number[i] < prev) {
      return false;
    }
    else if (!doubleChecked && number[i] === prev) {
      doubleChecked = true;
    }
    prev = number[i];
  }

  // when code reaches here, it means this number pass all criteria
  // except for having two adjacent digits being the same
  return doubleChecked;
}

// Part 2
function checkForAnswerV2(number) {
  number = number.toString();
  let prevNum = number[0];
  const adjacentDigits = {};
  let totalNumOfDoubles = 0;

  for (let i = 1; i < number.length; ++i) {
    if (number[i] < prevNum) {
      return false;
    }
    else if (number[i] === prevNum) {
      if (!adjacentDigits[number[i]]) {
        adjacentDigits[number[i]] = 2;
        ++totalNumOfDoubles;
      } else {
        if (adjacentDigits[number[i]] === 2) {
          --totalNumOfDoubles;
        }
        ++adjacentDigits[number[i]];
      }
    }
    prevNum = number[i];
  }

  debugger;
  // only return true if there's at least one pair of adjacent digits
  return totalNumOfDoubles > 0;
}

const input = '254032-789860';
solution(input);
