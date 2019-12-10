function* runIntcodeProgram(A = [], startInput) {
  let j = 0;
  let last = null;
  let input = [startInput];
  while (true) {
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
          if (input.length < 1) {
            const nextInput = yield;
            input = [nextInput];
          }
          A[A[i + 1]] = input[0];
          input = input.slice(1);
          j = 2;
          break;
        }
        case "04": {
          j = 2;
          last = l;
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
          A[A[i + 3]] = l < r ? 1 : 0;
          j = 4;
          break;
        }
        case "08": {
          A[A[i + 3]] = l === r ? 1 : 0;
          j = 4;
          break;
        }
        case "99":
          return last;
        default:
          j = Infinity;
          break;
      }
    }
  }
}

module.exports = { runIntcodeProgram };
