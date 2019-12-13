const A = [];
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
  if (types[tileId] === BALL) ballPosition = [x, y];
  if (types[tileId] === PADDLE) paddlePosition = [x, y];
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
  const [ballX, ballY] = ballPosition;
  const [paddleX, paddleY] = paddlePosition;
  if (paddleY - ballY < 1) return 0;
  return Math.sign(ballX - paddleX);
}

module.exports = {
  fillTile,
  printBoard,
  resetBoard,
  getBlockCount,
  getBestMove
};
