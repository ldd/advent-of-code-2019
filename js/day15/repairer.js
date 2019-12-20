const { shuffle, randomInArray } = require("../utils");

const canvas = Array(100)
  .fill()
  .map(() => []);
const startPosition = [50, 50];
let position = [...startPosition];
let machinePosition = null;
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
  machinePosition = null;
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

      // if position is an ancestor to nodeKey, move to it
      // otherwise move to position's ancestor
      // (we are trying to find the common ancestor of nodeKey and position)
      let ancestorKey = nodeKey;
      while (
        nodes[ancestorKey].parentKey !== null &&
        getDirection(ancestorKey) === null
      ) {
        ancestorKey = nodes[ancestorKey].parentKey;
      }
      move =
        getDirection(ancestorKey) || getDirection(nodes[position].parentKey);
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

const machineAncestorDic = {};

function getMachineAncestorDic() {
  let counter = 0;
  let currentKey = machinePosition;
  while (nodes[currentKey].parentKey !== null) {
    machineAncestorDic[currentKey] = counter;
    currentKey = nodes[currentKey].parentKey;
    counter += 1;
  }
  return counter;
}

function getCountToMachineAncestor(currentKey = position) {
  let counter = 0;
  while (currentKey !== null && !machineAncestorDic[currentKey]) {
    currentKey = nodes[currentKey].parentKey;
    counter += 1;
  }
  return counter + machineAncestorDic[currentKey] - 1;
}
function getOxygenDistance() {
  const leafs = Object.entries(nodes).filter(
    ([, node]) => node.childrenKeys === null
  );
  getMachineAncestorDic();
  return leafs.reduce((maxCount, [key]) => {
    const count = getCountToMachineAncestor(key);
    if (maxCount > count) return maxCount;
    return count;
  }, 0);
}

// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved and found the oxygen system.
const [WALLED, MOVED, FOUND] = [0, 1, 2];

function reportStatus(status, fullyExplore = false) {
  if (machinePosition && queue.length === 0) {
    return getOxygenDistance();
  }
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
      machinePosition = position;
      const distanceToMachine = getMachineAncestorDic();
      if (fullyExplore) return false;
      return distanceToMachine;
    }
    default:
      return false;
  }
}

module.exports = {
  drawCanvas,
  resetCanvas,
  getNextMove,
  reportStatus,
  getOxygenDistance
};
