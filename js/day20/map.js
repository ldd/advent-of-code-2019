function createMap(input) {
  const points = input.reduce(
    (dic, line, i) => [
      ...dic,
      ...line.reduce((p, n, j) => {
        if (n === " " || n === "#") return p;
        return [...p, [[i, j], n]];
      }, [])
    ],
    []
  );
  return points;
}

const options = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

const letterRegex = /^[A-Z]$/;
const isLetter = s => letterRegex.test(s);

const portalPositions = {};
const portalDic = {};

function addPortal(input, n, x, y) {
  // look south or east
  const south = input[[x + 1, y]];
  const east = input[[x, y + 1]];
  const north = input[[x - 1, y]];
  const west = input[[x, y - 1]];

  let portalName = "";
  let gatePoint = null;

  if (south && isLetter(south)) {
    portalName = `${n}${south}`;
    gatePoint = [x - 1, y];
  } else if (east && isLetter(east)) {
    portalName = `${n}${east}`;
    gatePoint = [x, y - 1];
  } else if (north && isLetter(north)) {
    portalName = `${north}${n}`;
    gatePoint = [x + 1, y];
  } else if (west && isLetter(west)) {
    portalName = `${west}${n}`;
    gatePoint = [x, y + 1];
  }

  if (portalName && input[gatePoint] === ".") {
    const portal = portalDic[portalName];
    if (portal) {
      portal.p2 = [x, y];
      portal.g2 = gatePoint;
      portalPositions[portal.p2] = { portalName, match: portal.g1 };
      portalPositions[portal.p1] = { portalName, match: portal.g2 };
    } else {
      portalDic[portalName] = { p1: [x, y], g1: gatePoint };
    }
  }

  return null;
}

function addEndPortals() {
  // make sure to fill start and end point;
  const start = portalDic.AA.p1;
  portalPositions[start] = { portalName: "AA", match: start };
  const end = portalDic.ZZ.p1;
  portalPositions[end] = { portalName: "ZZ", match: end };
}

function parseMap(points) {
  const map = Object.fromEntries(points);
  points.forEach(([k, v]) => {
    if (isLetter(v)) addPortal(map, v, k[0], k[1]);
  });
  addEndPortals();
  return { map, portalPositions };
}

function getStartingPoint() {
  const start = portalDic.AA;
  return start.g1;
}

module.exports = { createMap, parseMap, getStartingPoint, options };
