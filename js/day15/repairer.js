// const { randomInArray } = require("../utils");

const canvas = Array(100)
  .fill()
  .map(() => []);
const startPosition = [50, 50];
let position = [...startPosition];
let lastPosition = [];
const queue = [];
let nodes = {};

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

const directions = [1, 2, 3, 4];
const [NORTH, SOUTH, WEST, EAST] = directions;

function makeChildren(currentPosition) {
  return [
    [currentPosition[0], currentPosition[1] - 1],
    [currentPosition[0], currentPosition[1] + 1],
    [currentPosition[0] - 1, currentPosition[1]],
    [currentPosition[0] + 1, currentPosition[1]]
  ];
}

function pushChildren(nodeKey) {
  const node = nodes[nodeKey];
  if (!node) return;
  if (node.childrenKeys) return;
  node.childrenKeys = makeChildren(nodeKey);
  for (let i = 0; i < node.childrenKeys.length; i += 1) {
    const childKey = node.childrenKeys[i];
    nodes[childKey] = nodes[childKey] || {
      visited: false,
      childrenKeys: null
    };
    nodes[childKey].parentKey = nodeKey;
    if (!nodes[childKey].visited) {
      queue.push(childKey);
    }
  }
}

function resetCanvas() {
  canvas.length = 0;
  position = [...startPosition];
  lastPosition = [];
  queue.length = 0;
  nodes = {
    [startPosition]: { visited: true, parentKey: null, childrenKeys: null }
  };
  pushChildren(startPosition);
}

function getNextPosition(lastMove) {
  switch (lastMove) {
    case NORTH:
      return [position[0], position[1] - 1, NORTH];
    case SOUTH:
      return [position[0], position[1] + 1, SOUTH];
    case WEST:
      return [position[0] - 1, position[1], WEST];
    case EAST:
      return [position[0] + 1, position[1], EAST];
    default:
      return position;
  }
}

function getDirection(p1, p2 = position) {
  if (p1[0] === p2[0]) {
    if (p1[1] < p2[1]) return NORTH;
    if (p1[1] > p2[1]) return SOUTH;
    return null;
  }
  if (p1[1] === p2[1]) {
    if (p1[0] < p2[0]) return WEST;
    if (p1[0] > p2[0]) return EAST;
    return null;
  }
  return null;
}

function hasChangedPosition() {
  return lastPosition[0] !== position[0] && lastPosition[0] !== position[0];
}

let move = null;
let MUST_RETURN = false;
function getNextMove() {
  // move = randomInArray(directions);   // excellent AI. best AI
  if (queue.length > 0) {
    const nodeKey = queue.pop();
    const node = nodes[nodeKey];
    node.visited = true;
    move = getDirection(nodeKey);
  }
  if (move === null) MUST_RETURN = true;
  return move || EAST;
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
  lastPosition = [...position];
  if (MUST_RETURN) return true;
  switch (status) {
    case WALLED: {
      draw(WALL);
      return false;
    }
    case MOVED: {
      position = draw(SPACE);
      pushChildren(position);
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
