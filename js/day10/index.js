function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map((line, y) =>
      line.split("").map((entry, x) => ({ x, y, hasAsteroid: entry === "#" }))
    );
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  const asteroids = A.flatMap(line =>
    line.filter(({ hasAsteroid }) => hasAsteroid)
  );
  const maxAsteroid = asteroids
    .map(asteroid =>
      asteroids.reduce(
        (dic, { x, y }) => {
          if (x === asteroid.x && y === asteroid.y) return dic;
          const dy = y - asteroid.y;
          const dx = x - asteroid.x;
          const angle = Math.atan2(dx, dy);
          const key = `${angle},${Math.sign(dx)},${Math.sign(dy)}`;

          if (!dic[key]) dic.count++;
          return { ...dic, [key]: true, count: dic.count };
        },
        { count: 0 }
      )
    )
    .reduce((max, next) => (next.count < max.count ? max : next));
  return maxAsteroid.count;
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return A;
}

module.exports = { part1, part2 };
