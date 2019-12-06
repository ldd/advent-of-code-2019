function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}
function runProgram(A = []) {
  outputs = [];
  j = 0;
  for (let i = 0; i < A.length; i += j) {
    s = String(A[i]).padStart(5, 0);
    switch (s.slice(3, 5)) {
      case "01": {
        const l = s.slice(2, 3) === "1" ? A[i + 1] : A[A[i + 1]]
        const r = s.slice(1, 2) === "1" ? A[i + 2] : A[A[i + 2]]
        // console.log("first", s, l, r, A[i + 3])
        A[A[i + 3]] = l + r;
        j = 4;
        break;
      }
      case "02": {
        const l = s.slice(2, 3) === "1" ? A[i + 1] : A[A[i + 1]]
        const r = s.slice(1, 2) === "1" ? A[i + 2] : A[A[i + 2]]
        // console.log("second", s, l, r, A[i + 3])
        A[A[i + 3]] = l * r;
        j = 4;
        break;
      }
      case "03": {
        A[A[i + 1]] = 1;
        // console.log("third", s, A[i + 1])
        j = 2;
        break;
      }
      case "04": {
        const l = s.slice(2, 3) === "1" ? A[i + 1] : A[A[i + 1]]
        outputs.push(l);
        j = 2;
        break;
      }
      case 99: return A;
      default: j = Infinity; break;
    }
  }
  if (outputs.slice(0, -1).every(output => output === 0)) {
    return outputs[outputs.length - 1];
  }
  return null;
}
function part1(rawInput) {
  const A = parseInput(rawInput);
  return runProgram(A);
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
