const { shuffle } = require("../utils");

let vault = [];

const isPlayer = (x, y) => vault[y][x] === "@";
const isWall = (x, y) => vault[y][x] === "#";
const isDoor = (x, y) => /^[A-Z]$/.test(vault[y][x]);
const isKey = (x, y) => /^[a-z]$/.test(vault[y][x]);

function makeChildren(currentPosition) {
  return [
    [currentPosition[0], currentPosition[1] - 1],
    [currentPosition[0], currentPosition[1] + 1],
    [currentPosition[0] - 1, currentPosition[1]],
    [currentPosition[0] + 1, currentPosition[1]]
  ].filter(([x, y]) => vault[y] && vault[y][x] !== undefined);
}

function initialize(A = []) {
  vault = JSON.parse(JSON.stringify(A));
  let root = [];
  vault.some((line, y) =>
    line.some((entry, x) => {
      if (isPlayer(x, y)) {
        root = [x, y];
        return true;
      }
      return false;
    })
  );
  return root;
}

function exploreVault(root, keys = {}, doors = {}) {
  let nodes = {};
  let steps = 0;

  function dfs(node = root) {
    nodes[node] = { visited: true };

    const [x, y] = node;
    if (isKey(x, y) && keys[vault[y][x]] === undefined) {
      return node;
    }
    let pickedChild = null;
    shuffle(makeChildren([x, y])).some(childKey => {
      const [i, j] = childKey;
      const isVisited = nodes[childKey] && nodes[childKey].visited;
      const doorKey = vault[j][i];
      const isClosedDoor =
        isDoor(i, j) && keys[doorKey.toLowerCase()] === undefined;
      if (!isWall(x, y) && !isVisited && !isClosedDoor) {
        nodes[childKey] = { visited: true };
        pickedChild = dfs(childKey);
        return pickedChild !== null;
      }
      return false;
    });
    return pickedChild;
  }
  function runVault() {
    let node = dfs();
    while (node !== null) {
      const [x, y] = node;
      const key = vault[y][x];
      keys[key] = node;
      nodes = {};
      node = dfs([x, y]);
      console.log(keys);
    }
    return node;
  }
  return runVault();
}

function something(node) {
  // for (let i = 0; i < 5; i += 1) {
  exploreVault(node);
  // }
  // return 1;
}
module.exports = { initialize, something };
