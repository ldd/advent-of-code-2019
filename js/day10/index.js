function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map((line, y) =>
      line.split("").map((entry, x) => ({ x, y, hasAsteroid: entry === "#" }))
    );
}

function getAsteroids(A = []) {
  return A.flatMap(line => line.filter(({ hasAsteroid }) => hasAsteroid));
}
function getAngle(a, b) {
  const dy = b.y - a.y;
  const dx = b.x - a.x;

  // NOTICE that we need to add Math.PI/2 to start at the right angle
  let angle = Math.atan2(dy, dx) + Math.PI / 2;
  if (angle < 0) angle += Math.PI * 2;
  const key = `${angle}`;
  return key;
}
function getMaxAsteroid(asteroids) {
  return asteroids
    .map(asteroid =>
      asteroids.reduce(
        (dic, otherAsteroid) => {
          if (otherAsteroid.x === asteroid.x && otherAsteroid.y === asteroid.y)
            return dic;
          const key = getAngle(asteroid, otherAsteroid);

          const count = !dic[key] ? dic.count + 1 : dic.count;
          let angleValues = dic[key] || [];
          angleValues = [...angleValues, [otherAsteroid.x, otherAsteroid.y]];
          return { ...dic, [key]: angleValues, count };
        },
        { count: 0, position: { x: asteroid.x, y: asteroid.y } }
      )
    )
    .reduce((max, next) => (next.count < max.count ? max : next));
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  const asteroids = getAsteroids(A);
  const maxAsteroid = getMaxAsteroid(asteroids);
  return maxAsteroid.count;
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  const asteroids = getAsteroids(A);
  const groupedAsteroids = getMaxAsteroid(asteroids);
  const { position } = groupedAsteroids;
  const { x, y } = position;

  const sortedAsteroids = Object.entries(groupedAsteroids)
    .filter(([key]) => key !== "count" && key !== "position")
    .sort(([aKey], [bKey]) => +aKey - +bKey);

  const [, pickedValues] = sortedAsteroids[199];

  if (pickedValues.length !== 1) {
    pickedValues.sort((a, b) => {
      const dA = Math.abs(a[0] - x) + Math.abs(a[1] - y);
      const dB = Math.abs(b[0] - x) + Math.abs(b[1] - y);
      return dA - dB;
    });
  }
  const [pickedX, pickedY] = pickedValues[0];
  return pickedX * 100 + pickedY;
}

module.exports = { part1, part2 };
