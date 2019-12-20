const { shuffle, randomInArray } = require("../utils");

const canvas = Array(100)
  .fill()
  .map(() => []);
const startPosition = [50, 50];
let position = [...startPosition];
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
  return s;
}

const directions = [1, 2, 3, 4];
const [NORTH, SOUTH, WEST, EAST] = directions;

function makeChildren(currentPosition) {
  return shuffle([
    [currentPosition[0], currentPosition[1] - 1],
    [currentPosition[0], currentPosition[1] + 1],
    [currentPosition[0] - 1, currentPosition[1]],
    [currentPosition[0] + 1, currentPosition[1]]
  ]);
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
    if (nodes[childKey].parentKey === undefined) {
      nodes[childKey].parentKey = nodeKey;
    }
    if (!nodes[childKey].visited) {
      queue.push(childKey);
    }
  }
}

function resetCanvas() {
  canvas.length = 0;
  position = [...startPosition];
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

function getDirection(to, from = position) {
  if (to === null) return null;
  if (to[0] === from[0]) {
    if (from[1] - to[1] === 1) return NORTH;
    if (from[1] - to[1] === -1) return SOUTH;
    return null;
  }
  if (to[1] === from[1]) {
    if (from[0] - to[0] === 1) return WEST;
    if (from[0] - to[0] === -1) return EAST;
    return null;
  }
  return null;
}

let move = null;
// let MUST_RETURN = false;
function getNextMove() {
  // console.log(queue);
  if (queue.length > 0) {
    const nodeKey = queue.pop();
    const node = nodes[nodeKey];
    node.visited = true;
    move = getDirection(nodeKey);
    if (move === null) {
      queue.push(nodeKey);
      move = randomInArray(directions);
    }
  }
  return move || randomInArray(directions); // excellent AI. best AI
}

function draw(tileId = SPACE) {
  const [x, y] = getNextPosition(move);
  canvas[x] = canvas[x] || [];
  canvas[x][y] = tileId;
  return [x, y];
}

function getAncestorCount(currentKey = position) {
  let counter = 0;
  while (nodes[currentKey].parentKey !== null) {
    currentKey = nodes[currentKey].parentKey;
    counter += 1;
  }
  return counter;
}

// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved and found the oxygen system.
const [WALLED, MOVED, FOUND] = [0, 1, 2];
function reportStatus(status) {
  // if (MUST_RETURN) return true;
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
      return getAncestorCount();
    }
    default:
      return false;
  }
}

module.exports = { drawCanvas, resetCanvas, getNextMove, reportStatus };
