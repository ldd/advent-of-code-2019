const A = [];
// let lastPosition = [];
let ballPosition = [];
let paddlePosition = [];
const types = [
  Symbol("empty"),
  Symbol("wall"),
  Symbol("block"),
  Symbol("paddle"),
  Symbol("ball")
];
const [EMPTY, WALL, BLOCK, PADDLE, BALL] = types;

function fillTile(x, y, tileId) {
  if (A[y] === undefined) A[y] = [];
  A[y][x] = types[tileId];
  // lastPosition = ballPosition;
  if (types[tileId] === BALL) ballPosition = [x, y];
  if (types[tileId] === PADDLE) paddlePosition = [x, y];
  // console.log(printBoard());
}

function printBoard() {
  let output = "\n";
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[i].length; j += 1) {
      if (A[i][j] === EMPTY) output += " ";
      else if (A[i][j] === WALL) output += "*";
      else if (A[i][j] === BLOCK) output += "#";
      else if (A[i][j] === PADDLE) output += "%";
      else if (A[i][j] === BALL) output += "@";
    }
    output += "\n";
  }
  return output;
}

function resetBoard() {
  A.length = 0;
}

function getBlockCount() {
  return A.reduce(
    (count, row) => count + row.reduce((p, n) => p + (n === BLOCK ? 1 : 0), 0),
    0
  );
}

function getBestMove() {
  const [ballX] = ballPosition;
  const [paddleX] = paddlePosition;
  if (ballX - paddleX > 1) return 1;
  if (ballX - paddleX < 1) return -1;
  return 0;
}

module.exports = {
  fillTile,
  printBoard,
  resetBoard,
  getBlockCount,
  getBestMove
};
