 const input = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,67,92,225,1101,14,84,225,1002,217,69,224,101,-5175,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,1,214,95,224,101,-127,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1101,8,41,225,2,17,91,224,1001,224,-518,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,37,27,225,1101,61,11,225,101,44,66,224,101,-85,224,224,4,224,1002,223,8,223,101,6,224,224,1,224,223,223,1102,7,32,224,101,-224,224,224,4,224,102,8,223,223,1001,224,6,224,1,224,223,223,1001,14,82,224,101,-174,224,224,4,224,102,8,223,223,101,7,224,224,1,223,224,223,102,65,210,224,101,-5525,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,81,9,224,101,-90,224,224,4,224,102,8,223,223,1001,224,3,224,1,224,223,223,1101,71,85,225,1102,61,66,225,1102,75,53,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,226,226,224,102,2,223,223,1005,224,329,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,344,101,1,223,223,1007,226,677,224,102,2,223,223,1005,224,359,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,374,101,1,223,223,1108,677,226,224,1002,223,2,223,1005,224,389,1001,223,1,223,108,226,677,224,102,2,223,223,1006,224,404,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,419,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,434,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,449,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,464,1001,223,1,223,107,226,677,224,1002,223,2,223,1006,224,479,1001,223,1,223,107,677,677,224,102,2,223,223,1005,224,494,1001,223,1,223,1008,226,677,224,102,2,223,223,1006,224,509,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,524,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,539,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,569,1001,223,1,223,7,226,677,224,102,2,223,223,1006,224,584,1001,223,1,223,8,677,226,224,102,2,223,223,1005,224,599,101,1,223,223,1107,677,677,224,1002,223,2,223,1005,224,614,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,629,1001,223,1,223,7,226,226,224,1002,223,2,223,1006,224,644,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,659,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,674,101,1,223,223,4,223,99,226];

const opcode = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LT: 7,
  EQ: 8,
  HALT: 99
}
const paramMode = {
  POSITION: '0',
  IMMEDIATE: '1'
}

const AIR_CONDITIONER_UNIT_ID = 1;
const THERMAL_RADIATOR_CONTROLLER_ID = 5;

function getOutput(input, systemId) {
  let inputArr = [...input];

  // opcode`
  let instructionPointer = 0;
  let nextOpcodePos;
  let opcodeInput;
  let opcodeProtocol;
  // parameters
  let input1;
  let inputPos1 = 0;
  let input2;
  let inputPos2 = 0;
  let output;
  let outputPos = 0;
  
  while(inputArr[instructionPointer] !== opcode.HALT) {
    // analyze opcode
    opcodeInput = inputArr[instructionPointer].toString();
    opcodeProtocol = Number(opcodeInput.slice(-2));
    inputPos1 = opcodeInput[opcodeInput.length - 3] === paramMode.IMMEDIATE 
      ? instructionPointer + 1 
      : inputArr[instructionPointer + 1];
    inputPos2 = opcodeInput[opcodeInput.length - 4] === paramMode.IMMEDIATE 
      ? instructionPointer + 2 
      : inputArr[instructionPointer + 2];
    outputPos = inputArr[instructionPointer + 3];

    switch (opcodeProtocol) {
      case opcode.INPUT:
        inputArr[inputArr[instructionPointer + 1]] = systemId;
        nextOpcodePos = 2;
        break;
      case opcode.OUTPUT:
        output = inputArr[inputArr[instructionPointer + 1]];
        nextOpcodePos = 2;
        break;
      case opcode.JUMP_IF_TRUE:
      case opcode.JUMP_IF_FALSE:
        input1 = inputArr[inputPos1];
        input2 = inputArr[inputPos2];
        
        if (opcodeProtocol === opcode.JUMP_IF_TRUE && input1 !== 0 || opcodeProtocol === opcode.JUMP_IF_FALSE && input1 === 0) {
          instructionPointer = input2;
          continue;
        }
        
        nextOpcodePos = 3;
        break;
      case opcode.ADD:
      case opcode.MULTIPLY:
      case opcode.LT:
      case opcode.EQ:
        input1 = inputArr[inputPos1];
        input2 = inputArr[inputPos2];

        if (opcodeProtocol === opcode.ADD) {
          inputArr[outputPos] = input1 + input2;
        } else if (opcodeProtocol === opcode.MULTIPLY) {
          inputArr[outputPos] = input1 * input2;
        } else if (opcodeProtocol === opcode.LT) {
          inputArr[outputPos] = input1 < input2 ? 1 : 0
        } else if (opcodeProtocol === opcode.EQ) {
          inputArr[outputPos] = input1 === input2 ? 1 : 0;
        }

        nextOpcodePos = 4;
        break;
    }

    instructionPointer += nextOpcodePos;
  }
  return output
}

// getOutput(input, AIR_CONDITIONER_UNIT_ID);
getOutput(input, THERMAL_RADIATOR_CONTROLLER_ID);
