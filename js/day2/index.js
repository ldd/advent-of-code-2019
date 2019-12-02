function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}
function runProgram(A = []) {
  for (let i = 0; i < A.length; i += 4) {
    switch (A[i]) {
      case 1: {
        A[A[i + 3]] = A[A[i + 1]] + A[A[i + 2]];
        break;
      }
      case 2: {
        A[A[i + 3]] = A[A[i + 1]] * A[A[i + 2]];
        break;
      }
      case 99:
        return A;
      default:
        break;
    }
  }
}
function part1(rawInput) {
  const A = parseInput(rawInput);
  A[1] = 12;
  A[2] = 2;
  return runProgram(A)[0];
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const B = [...A];
      B[1] = i;
      B[2] = j;
      if (runProgram(B)[0] === 19690720) return 100 * i + j;
    }
  }
  return -1;
}

module.exports = { part1, part2 };
