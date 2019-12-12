const ROWS = 6;
const COLS = 25;
function parseInput(rawInput = "") {
  return rawInput.split("").map(Number);
}

// split an array of points into a 25x6 2D array
function prepareLayers(input = []) {
  return input.reduce(
    (layers, n, i) =>
      i % (ROWS * COLS) === 0
        ? [...layers, [n]]
        : [...layers.slice(0, -1), layers[layers.length - 1].concat(n)],
    []
  );
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  const layers = prepareLayers(A);

  // TODO: write a generic count reducer
  const getDigitCount = layer =>
    layer.reduce((counts, p) => ({ ...counts, [p]: (counts[p] || 0) + 1 }), {});

  const minLayerCount = layers
    .map(getDigitCount)
    .reduce((minCount, count) => (count[0] > minCount[0] ? count : minCount));

  return minLayerCount[1] * minLayerCount[2];
}

// the output of this function is then visually checked by a human to know the answer
// TODO: get the actual answer instead of relying on manual human check
const printPoint = point => (point === 0 ? " " : ".");
function printLayer(layer) {
  return layer.reduce(
    (acc, n, i) =>
      i % COLS === 0 ? `${acc}\n${printPoint(n)}` : acc + printPoint(n),
    ""
  );
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  const layers = prepareLayers(A);

  // we were asked to start from the last layer in the input, so we use reduceRight
  const pickedLayer = layers.reduceRight((previousLayer, layer) =>
    layer.map((entry, i) => (entry === 2 ? previousLayer[i] : entry))
  );

  return printLayer(pickedLayer);
}

module.exports = { part1, part2 };
