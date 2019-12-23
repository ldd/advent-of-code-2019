const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], programArray = []) {
  let i = 0;
  const instance = runIntcodeProgram([...A], programArray[i].shift(), false);
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

function part1(rawInput) {
  const A = parseInput(rawInput);
  const rawProgram = `
  NOT A J
  NOT B T
  OR T J
  NOT C T
  OR T J
  AND D J
  WALK
  `;
  const program = rawProgram
    .split("\n")
    .map(s =>
      `${s}\n`
        .trimLeft()
        .split("")
        .map(e => e.charCodeAt(0))
    )
    .filter(s => s.length > 0);
  const a = getResultFromProgram(A, program);
  return a;
}

function part2(rawInput) {
  // const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
