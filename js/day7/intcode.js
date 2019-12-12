const IMMEDIATE = "1";
const RELATIVE = "2";

function* runIntcodeProgram(
  A = [],
  startInput,
  keepOutput = false,
  relativeBase = 0
) {
  let j = 0;
  let last = null;
  let input = [startInput];
  let output = [];
  while (true) {
    for (let i = 0; i < A.length; i += j) {
      const s = String(A[i]).padStart(5, 0);
      // 0 is position mode, 1 is immediate mode, 2 is relative mode
      const [leftMode, rightMode] = [s.slice(2, 3), s.slice(1, 2)];
      let l = leftMode === IMMEDIATE ? A[i + 1] : A[A[i + 1]];
      l = leftMode === RELATIVE ? A[A[i + 1] + relativeBase] : l;
      if (l === undefined) l = 0;
      let r = rightMode === IMMEDIATE ? A[i + 2] : A[A[i + 2]];
      r = rightMode === RELATIVE ? A[A[i + 2] + relativeBase] : r;
      if (r === undefined) r = 0;

      let w = A[i + 3];
      if (s.slice(0, 1) === RELATIVE) w += relativeBase;

      switch (s.slice(3, 5)) {
        case "01": {
          A[w] = l + r;
          j = 4;
          break;
        }
        case "02": {
          A[w] = l * r;
          j = 4;
          break;
        }
        case "03": {
          if (input.length < 1) {
            const nextInput = yield;
            input = [nextInput];
          }
          w = A[i + 1];
          if (leftMode === RELATIVE) w += relativeBase;
          A[w] = input[0];
          input = input.slice(1);
          j = 2;
          break;
        }
        case "04": {
          j = 2;
          last = l;
          if (keepOutput) output = output.concat(last);
          yield l;
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
          A[w] = l < r ? 1 : 0;
          j = 4;
          break;
        }
        case "08": {
          A[w] = l === r ? 1 : 0;
          j = 4;
          break;
        }
        case "09": {
          relativeBase += l;
          j = 2;
          break;
        }
        case "99":
          if (keepOutput) return output.join(",");
          return last;
        default:
          j = Infinity;
          break;
      }
    }
  }
}

module.exports = { runIntcodeProgram };
