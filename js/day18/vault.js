const { shuffle } = require("../utils");

let vault = [];
let root = [];
let visited = {};
let keys = {};

const isPlayer = (x, y) => vault[y][x] === "@";

function initialize(A = []) {
  vault = JSON.parse(JSON.stringify(A));
  vault.some((line, y) =>
    line.some((entry, x) => {
      if (isPlayer(x, y)) {
        root = [x, y];
        return true;
      }
      return false;
    })
  );
  visited = {};
  keys = {};
  return root;
}

const isWall = (x, y) => vault[y][x] === "#";
const isDoor = (x, y) => /^[A-Z]$/.test(vault[y][x]);
const isKey = (x, y) => /^[a-z]$/.test(vault[y][x]);

function makeChildren(currentPosition) {
  return shuffle([
    [currentPosition[0], currentPosition[1] - 1],
    [currentPosition[0], currentPosition[1] + 1],
    [currentPosition[0] - 1, currentPosition[1]],
    [currentPosition[0] + 1, currentPosition[1]]
  ]).filter(([x, y]) => vault[y] && vault[y][x] !== undefined);
}

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

  makeChildren([x, y]).forEach(child => (visited[child] ? null : dfs(child)));
}

function something() {
  dfs();
  return keys;
}
module.exports = { initialize, something };
