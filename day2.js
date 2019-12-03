// 1. n + 4(n=0,1,2,...) is the protocol element
// 2. other elements are positions in input array
const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0];

const opcode = {
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
}

// Part 1
// before running the program, replace position 1 with the value 12 and replace position 2 with the value 2. What value is left at position 0 after the program halts
function getOutput(input) {
  let inputArr = [...input];

  // opcode
  let currentOpcodePos = 0;
  // parameters
  let input1Pos = 0;
  let input2Pos = 0;
  let outputPos = 0;
  
  while(currentOpcodePos < inputArr.length && inputArr[currentOpcodePos] !== opcode.HALT) {
    input1Pos = inputArr[currentOpcodePos + 1];
    input2Pos = inputArr[currentOpcodePos + 2];
    outputPos = inputArr[currentOpcodePos + 3];
    switch (inputArr[currentOpcodePos]) {
      case opcode.ADD:
        inputArr[outputPos] = inputArr[input1Pos] + inputArr[input2Pos];
        break;
      case opcode.MULTIPLY:
        inputArr[outputPos] = inputArr[input1Pos] * inputArr[input2Pos];
        break;
    }
    currentOpcodePos += 4;
  }
  return inputArr[0];
}

const tweakInputArrV1 = (inputArr) => {
  // noun (0 ~ 99)
  inputArr[1] = 12;
  // verb (0 ~ 99)
  inputArr[2] = 2;
}
// tweakInputArrV1(input);
// getOutput(input);

// Part 2
// determine what pair of inputs produces the output 19690720
// What is 100 * noun + verb?
function solution(input) {
  const MIN_NOUN = 0;
  const MAX_NOUN = 99;
  const MIN_VERB = 0;
  const MAX_VERB = 99;
  const answer = 19690720;
  const inputArr = [...input];

  let originalNoun = inputArr[1];
  let originalVerb = inputArr[2];
  function tweakInputArrV2(noun, verb) {
    // noun (0 ~ 99)
    inputArr[1] = noun;
    // verb (0 ~ 99)
    inputArr[2] = verb;
  }
  
  let output = 0;
  for (let noun = MIN_NOUN; noun <= MAX_NOUN; ++noun) {
    for (let verb = MIN_VERB; verb <= MAX_VERB; ++verb) {
      tweakInputArrV2(originalNoun, originalVerb);
      tweakInputArrV2(noun, verb);
      output = getOutput(inputArr);
      if (output === answer) {
        return 100 * noun + verb;
      }
    }
  }
}

solution(input);
