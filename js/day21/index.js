const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], programArray = [], keepOutput = false) {
  let i = 0;
  const instance = runIntcodeProgram(
    [...A],
    programArray[i].shift(),
    keepOutput
  );
  let result = { value: undefined, done: false };
  while (result.done === false) {
    const oldValue = result.value;
    result = instance.next();
    if (result.value === undefined) {
      if (!programArray[i]) return oldValue;
      while (programArray[i].length > 0) {
        const n = programArray[i].shift();
        result = instance.next(n);
      }
      i += 1;
    }
  }
  return result.value;
}

function parseASCII(input) {
  return input
    .trimLeft()
    .split(",")
    .map(s => String.fromCharCode(s))
    .join("");
}

function encodeASCII(input) {
  return input
    .split("\n")
    .map(s =>
      `${s}\n`
        .trimLeft()
        .split("")
        .map(e => e.charCodeAt(0))
    )
    .filter(s => s.length > 0);
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  const rawProgram = `
  OR A T
  AND B T
  AND C T
  NOT T J

  NOT T T

  AND D T
  AND T J
  WALK
  `;
  const program = encodeASCII(rawProgram);
  return getResultFromProgram(A, program);
}

function part2(rawInput) {
  const A = parseInput(rawInput);

  // TODO: those OR in the middle were added
  // by trial and error to make sure they pass the tests
  // (it is possible that they are not generic enough)
  const rawProgram = `
  OR A T
  AND B T
  AND C T
  NOT T J
  
  OR H T
  OR E T

  AND D T
  AND T J
  RUN
  `;
  const program = encodeASCII(rawProgram);
  return getResultFromProgram(A, program);
}

module.exports = { part1, part2 };
