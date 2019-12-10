const { runIntcodeProgram } = require("./intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getMaxThrust(A, start = 0, useFeedbackLoop = false) {
  let max = -Infinity;
  // TODO: use a library to find unique choices and avoid this big loop
  for (let i = start; i < start + 5; i++) {
    for (let j = start; j < start + 5; j++) {
      for (let k = start; k < start + 5; k++) {
        for (let l = start; l < start + 5; l++) {
          for (let m = start; m < start + 5; m++) {
            const choices = [i, j, k, l, m];
            if (new Set(choices).size === 5) {
              const output = getThrust(A, choices, useFeedbackLoop);
              if (max < output) max = output;
            }
          }
        }
      }
    }
  }

  return max;
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return getMaxThrust(A);
}
function getThrust(A, choices, useFeedbackLoop = false) {
  const instances = choices.map((_, i) =>
    runIntcodeProgram([...A], choices[i])
  );
  // every instance is a generator. Here we are using them as observers
  // more info: https://medium.com/@swazza85/using-es6-generators-as-observers-3c8259d5785
  instances.forEach(i => i.next());

  let result = { value: 0, done: false };

  // pick a do-while to guarantee a result even when we are not using a feedbackloop
  do {
    for (let i = 0; i < 5; i++) {
      // we attempt to get an output from the generator. If this fails, we were expected to give it an input
      partial = instances[i].next(result.value);
      if (partial.value === undefined) result = instances[i].next(result.value);
      else result = partial;
    }
  } while (useFeedbackLoop && result.done === false);
  return result.value;
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return getMaxThrust(A, 5, true);
}

module.exports = { part1, part2 };
