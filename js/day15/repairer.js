const canvas = Array(100)
  .fill()
  .map(() => []);
const startPosition = [50, 50];
let position = [...startPosition];

const [WALL, SPACE, DROID, MACHINE, UNKNOWN] = ["#", ".", "D", "@", " "];

function drawCanvas() {
  let s = "";
  for (let i = 0; i < 100; i += 1) {
    canvas[i] = canvas[i] || [];
    for (let j = 0; j < 100; j += 1) {
      canvas[j] = canvas[j] || [];
      if (position[0] === j && position[1] === i) s += DROID;
      else s += canvas[j][i] || UNKNOWN;
    }
    s += "\n";
  }
  console.log(
    s
      .split("\n")
      .filter(f => f.includes("#") || f.includes("D") || f.includes("."))
      .join("\n")
  );
}

function resetCanvas() {
  canvas.length = 0;
  position = [...startPosition];
}

// const [NORTH, SOUTH, WEST, EAST] = [1, 2, 3, 4];
// const directions = [NORTH, SOUTH, WEST, EAST];
const directions = [1, 2, 3, 4];
const [NORTH, SOUTH, WEST, EAST] = directions;

function getNextPosition(lastMove) {
  switch (lastMove) {
    case NORTH:
      return [position[0], position[1] - 1];
    case SOUTH:
      return [position[0], position[1] + 1];
    case WEST:
      return [position[0] - 1, position[1]];
    case EAST:
      return [position[0] + 1, position[1]];
    default:
      return position;
  }
}

let move = null;
function getNextMove() {
  for (let j = 0; j < directions.length; j += 1) {
    const [x, y] = getNextPosition(directions[j]);
    canvas[x] = canvas[x] || [];
    if (canvas[x][y] !== WALL) {
      move = directions[j];
      break;
    }
  }
  return move;
}

function draw(tileId = SPACE) {
  const [x, y] = getNextPosition(move);
  canvas[x] = canvas[x] || [];
  canvas[x][y] = tileId;
  return [x, y];
}

// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved and found the oxygen system.
const [WALLED, MOVED, FOUND] = [0, 1, 2];
function reportStatus(status) {
  switch (status) {
    case WALLED: {
      draw(WALL);
      return false;
    }
    case MOVED: {
      position = draw(SPACE);
      return false;
    }
    case FOUND: {
      position = draw(MACHINE);
      return true;
    }
    default:
      return false;
  }
}

module.exports = { drawCanvas, resetCanvas, getNextMove, reportStatus };
