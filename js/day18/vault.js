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

function exploreVault(root, f = a => a) {
  const visited = {};
  const keys = {};

  function dfs(node = root) {
    visited[node] = true;

    const [x, y] = node;
    if (isWall(x, y)) return;
    if (isKey(x, y)) keys[vault[y][x]] = node;
    if (isDoor(x, y)) {
      const door = vault[y][x];
      const key = door.toLowerCase();
      if (keys[key] === undefined) return;
      keys[key] = undefined;
    }

    f(makeChildren([x, y])).forEach(child =>
      visited[child] ? null : dfs(child)
    );
  }
  dfs();
  return { keys };
}

function something(node) {
  console.log(exploreVault(node, a => a));
  console.log(exploreVault(node, a => [...a].reverse()));
  return exploreVault(node);
}
module.exports = { initialize, something };
