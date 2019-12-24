const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function runInstances(A = []) {
  const instances = Array(50)
    .fill()
    .map((_, i) => runIntcodeProgram([...A], i, false));
  instances.map(instance => instance.next());

  const messages = Array(50)
    .fill()
    .map(() => []);
  const handler = (instance, i) => {
    const [x, y] = messages[i].shift() || [-1, -1];
    let { value: destination } = instance.next(x);
    if (destination === undefined) {
      ({ value: destination } = instance.next(y));
    }
    const { value: receivedX } = instance.next(-1);
    const { value: receivedY } = instance.next(-1);
    return [destination, receivedX, receivedY];
  };

  for (;;) {
    let result = null;
    const foundResult = instances
      .map(handler)
      .some(([destination, x, y] = []) => {
        if (destination === 255) {
          result = y;
          return true;
        }
        if (destination !== undefined) {
          if (messages[destination]) messages[destination].push([x, y]);
        }
        return false;
      });
    if (foundResult) return result;
  }
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return runInstances(A);
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
