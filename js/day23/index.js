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

  let natResult = null;
  for (;;) {
    let deferedResult = null;
    const results = instances.map(handler);

    const foundResult = results.some(([destination, x, y] = []) => {
      if (destination === 255) {
        deferedResult = [x, y];
        return false;
        // return true;
      }
      if (destination !== undefined) {
        if (messages[destination]) messages[destination].push([x, y]);
      }
      return false;
    });
    if (foundResult) return deferedResult;

    const idleResults = results.filter(
      result => result.every(value => value === undefined) || result[0] === 255
    );
    const emptyMessages = messages.filter(m => m.length === 0);
    if (emptyMessages.length === 50 && idleResults.length === 50) {
      natResult = deferedResult || natResult;
      if (natResult) {
        console.log(natResult);
        messages[0].push(natResult.concat(true));
      }
    }
  }
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return runInstances(A)[1];
}
// too low: 2572
function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
