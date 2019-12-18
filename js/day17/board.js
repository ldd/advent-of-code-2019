let board = "";
function resetBoard() {
  board = "";
}

function getBoardAsArray() {
  return board
    .split("\n")
    .filter(Boolean)
    .map(line => line.split("").map(entry => entry !== "."))
    .filter(line => line.length > 1);
}

function getIntersectionSum() {
  const A = getBoardAsArray();
  const rows = A.length;
  const cols = A[0].length;
  let sum = 0;
  for (let y = 0; y < cols; y += 1) {
    for (let x = 0; x < rows; x += 1) {
      const neighbours = [
        [(x - 1 + rows) % rows, y],
        [(x + 1) % rows, y],
        [x, (y - 1 + cols) % cols],
        [x, (y + 1) % cols]
      ];
      const allIntersections = neighbours.every(([i, j]) => A[i][j]);
      if (A[x][y] && allIntersections) {
        A[x][y] = false;
        sum += x * y;
      }
    }
  }
  return sum;
}

function drawCanvas() {
  console.log(board);
}

function fillTile(entry) {
  board += String.fromCharCode(entry);
}

module.exports = { resetBoard, getIntersectionSum, drawCanvas, fillTile };
