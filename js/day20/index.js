const { parseMap, createMap, getStartingPoint, options } = require("./map");

function traverse(map, startingPoint, portals) {
  const visited = { [startingPoint]: true };
  const toVisit = [[...startingPoint, 0]];
  while (toVisit.length > 0) {
    let answer = null;

    const [x, y, steps] = toVisit.shift();

    options.some(([movX, movY]) => {
      let nextPoint = [x + movX, y + movY];
      if (visited[nextPoint]) return false;

      const pointInMap = map[nextPoint];
      if (pointInMap) {
        if (portals[nextPoint]) {
          const { match, portalName } = portals[nextPoint];
          if (portalName) {
            if (portalName === "ZZ") {
              answer = steps;
              return true;
            }
            if (portalName === "AA") return false;
            nextPoint = match;
          }
        }
        toVisit.push([...nextPoint, steps + 1]);
        visited[nextPoint] = true;
      }
      return false;
    });
    if (answer) return answer;
  }
  return null;
}

function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}
// heavily inspired by this reddit comment:
// https://www.reddit.com/r/adventofcode/comments/ed5ei2/2019_day_20_solutions/fbjhzfe/
function part1(rawInput) {
  const input = parseInput(rawInput);

  const rawMap = createMap(input);
  const { map, portalPositions } = parseMap(rawMap);
  const point = getStartingPoint(map);
  const startingPoint = point;
  return traverse(map, startingPoint, portalPositions);
}
function part2() {
  return null;
}

module.exports = { part1, part2 };
