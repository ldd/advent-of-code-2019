function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}
function runIntcodeProgram(A = [], input = []) {
  outputs = [];
  j = 0;
  for (let i = 0; i < A.length; i += j) {
    s = String(A[i]).padStart(5, 0);
    const l = s.slice(2, 3) === "1" ? A[i + 1] : A[A[i + 1]];
    const r = s.slice(1, 2) === "1" ? A[i + 2] : A[A[i + 2]];

    switch (s.slice(3, 5)) {
      case "01": {
        A[A[i + 3]] = l + r;
        j = 4;
        break;
      }
      case "02": {
        A[A[i + 3]] = l * r;
        j = 4;
        break;
      }
      case "03": {
        A[A[i + 1]] = input[0] || 0;
        input = input.slice(1);
        j = 2;
        break;
      }
      case "04": {
        outputs.push(l);
        j = 2;
        break;
      }
      case "05": {
        if (l !== 0) j = r - i;
        else j = 3;
        break;
      }
      case "06": {
        if (l === 0) j = r - i;
        else j = 3;
        break;
      }
      case "07": {
        A[A[i + 3]] = l < r ? 1 : 0;
        j = 4;
        break;
      }
      case "08": {
        A[A[i + 3]] = l === r ? 1 : 0;
        j = 4;
        break;
      }
      case 99:
        return;
      default:
        j = Infinity;
        break;
    }
  }
  // we expect all tests to pass ( all outputs except last to be zero)
  if (outputs.slice(0, -1).every(output => output === 0)) {
    return outputs[outputs.length - 1];
  }
  return null;
}
function part1(rawInput) {
  const A = parseInput(rawInput);
  return runIntcodeProgram(A, [1]);
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return runIntcodeProgram(A, [5]);
}

module.exports = { part1, part2, runIntcodeProgram };
