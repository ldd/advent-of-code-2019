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

function getNeighbours(x, y, rows, cols) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ].filter(([i, j]) => i >= 0 && i < rows && j >= 0 && j < cols);
}

function getIntersectionSum() {
  const A = getBoardAsArray();
  const rows = A.length;
  const cols = (A[0] || []).length;
  let sum = 0;
  for (let y = 0; y < cols; y += 1) {
    for (let x = 0; x < rows; x += 1) {
      const neighbours = getNeighbours(x, y, rows, cols);
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
  board += String.fromCharCode(Number(entry));
}

function getBotNeighbours(botOrientation, x, y) {
  let pattern = [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1]
  ];
  pattern = pattern.concat(pattern);
  let result;
  switch (botOrientation) {
    case "^":
      result = pattern.slice(0, 3);
      break;
    case ">":
      result = pattern.slice(1, 4);
      break;
    case "v":
      result = pattern.slice(2, 5);
      break;
    case "<":
      result = pattern.slice(3, 6);
      break;
    default:
      result = pattern.slice(0, 3);
      break;
  }
  // always prefer keeping your path
  const [a, b, c] = result;
  result = [b, a, c];
  return result;
}

function rotate(botOrientation, direction) {
  const orientations = ["^", ">", "v", "<"];
  let index = orientations.findIndex(
    orientation => orientation === botOrientation
  );
  if (index === -1) return "^";
  if (direction === "right") index = (index + 1) % orientations.length;
  if (direction === "left") index = (index + 3) % orientations.length;
  return orientations[index];
}

function getLongPath() {
  const A = getBoardAsArray();
  const rows = A.length;
  const cols = (A[0] || []).length;

  const botIndex = board.search(/[\^v<>]/);
  // +1 to account for newlines in string
  let [x, y] = [botIndex % (cols + 1), Math.floor(botIndex / (cols + 1))];

  let output = [];
  let botOrientation = board[botIndex];
  for (;;) {
    const neighbours = getBotNeighbours(botOrientation, x, y, rows, cols);
    const index = neighbours.findIndex(([i, j]) => A[j] && A[j][i]);
    if (index === -1) break;
    [x, y] = neighbours[index];
    // A[y][x] = false;

    // add to output
    if (index === 0) output[output.length - 1] += 1;
    else if (index === 1) {
      output = output.concat(["L", 1]);
      botOrientation = rotate(botOrientation, "left");
    } else if (index === 2) {
      output = output.concat(["R", 1]);
      botOrientation = rotate(botOrientation, "right");
    }
  }
  return output;
}

// TODO: improve function to find patterns algorithmically
function getSimplifiedPath() {
  // hard code patterns found visually
  const A = "L,4,L,6,L,8,L,12";
  const B = "L,8,R,12,L,12";
  const C = "R,12,L,6,L,6,L,8";
  const path = getLongPath().join(",");

  const shortPath = path
    .split(A)
    .join("A")
    .split(B)
    .join("B")
    .split(C)
    .join("C");
  return [shortPath, A, B, C];
}

function getPath() {
  return getSimplifiedPath().map(program =>
    `${program}\n`
      .split("")
      .map(char => char.charCodeAt(0))
      .join("")
  );
}

module.exports = {
  drawCanvas,
  fillTile,
  getPath,
  getIntersectionSum,
  resetBoard
};
