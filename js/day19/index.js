const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], x = 0, y = 0) {
  const instance = runIntcodeProgram([...A], x, true);
  let result = { done: false, value: undefined };
  instance.next();
  instance.next(y);
  result = instance.next();
  return result.value;
}

function isAffected(A, x, y) {
  return getResultFromProgram(A, x, y) === "1";
}

function pullCount(A = 0) {
  let count = 0;
  for (let x = 0; x < 50; x += 1) {
    for (let y = 0; y < 50; y += 1) {
      count += isAffected(A, x, y) ? 1 : 0;
    }
  }
  return count;
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return pullCount(A);
}

function getSlopes(A = 0) {
  let leftSlope;
  let rightSlope;
  const x = 900;
  let flag = false;
  for (let y = x; ; y += 1) {
    if (leftSlope && rightSlope) {
      return [leftSlope, rightSlope];
    }
    if (isAffected(A, x, y)) {
      if (leftSlope === undefined) {
        leftSlope = y / x;
      }
      flag = true;
    } else if (flag === true) {
      rightSlope = (y - 1) / x;
    }
  }
}

function getShipPosition(A) {
  const [m1, m2] = getSlopes(A);
  // from the fact that
  // g(x0 + 99) = y0
  // f(x0)      = y0 + 99
  // and knowing f and g
  const x0 = Math.floor(((1 + m1) / (m1 - m2)) * -99);

  // x0 is an estimate. we must try with surrounding values
  for (let x = x0 - 10; x < x0 + 10; x += 1) {
    const y = Math.floor(m1 * (x + 99));
    let isValidTile = true;
    isValidTile = isValidTile && isAffected(A, x, y + 99);
    isValidTile = isValidTile && isAffected(A, x, y);
    isValidTile = isValidTile && isAffected(A, x + 99, y);
    isValidTile = isValidTile && isAffected(A, x + 99, y + 99);
    if (isValidTile) return x * 1e4 + y;
  }
  return -1;
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return getShipPosition(A);
}

module.exports = { part1, part2 };
