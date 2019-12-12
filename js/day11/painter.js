const COLS = 100;
const ROWS = 100;
const mid = Math.floor(ROWS / 2) * COLS + Math.floor(COLS / 2);

const BLACK = 0;
const WHITE = 1;
const LEFT = 0;
const RIGHT = 1;

let canvas;
let visited;
let position;
let direction;

function resetCanvas() {
  canvas = Array(COLS * ROWS).fill(BLACK);
  visited = Array(COLS * ROWS).fill(false);
  position = mid;
  direction = 0;
}
resetCanvas();

function paint(color, turnDirection) {
  visited[position] = true;
  canvas[position] = color;

  // turn left or right
  if (turnDirection === LEFT) direction = (direction + 270) % 360;
  else if (turnDirection === RIGHT) direction = (direction + 90) % 360;

  switch (direction) {
    case 0:
      position -= COLS;
      break;
    case 90:
      position += 1;
      break;
    case 180:
      position += COLS;
      break;
    case 270:
      position -= 1;
      break;
  }
  return canvas[position];
}
const printPoint = point => (point === 0 ? "." : "#");

function drawCanvas() {
  return canvas.reduce(
    (acc, n, i) =>
      i % COLS === 0 ? `${acc}\n${printPoint(n)}` : acc + printPoint(n),
    ""
  );
}

function getPaintCount() {
  return visited.filter(Boolean).length;
}

module.exports = { drawCanvas, resetCanvas, paint, getPaintCount };
