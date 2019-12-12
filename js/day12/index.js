function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(entry =>
      entry
        .split(/[,<>=]/)
        .filter(Number)
        .map(Number)
    );
}

function generateVelocities(positions) {
  return positions.map(position => position.map(() => 0));
}

function applyGravity(positions = [], velocities = []) {
  const newVelocities = velocities.map(velocity => [...velocity]);
  for (let axis = 0; axis < 3; axis += 1) {
    for (let i = 0; i < positions.length; i += 1) {
      const position = positions[i][axis];
      for (let j = i; j < positions.length; j += 1) {
        const otherPosition = positions[j][axis];
        if (position > otherPosition) {
          newVelocities[i][axis] += -1;
          newVelocities[j][axis] += 1;
        } else if (position < otherPosition) {
          newVelocities[i][axis] += 1;
          newVelocities[j][axis] += -1;
        }
      }
    }
  }
  return newVelocities;
}

function applyVelocity(positions, velocities) {
  return positions.map((position, i) => [
    velocities[i][0] + position[0],
    velocities[i][1] + position[1],
    velocities[i][2] + position[2]
  ]);
}

const sumReducer = (sum, axis) => Math.abs(sum) + Math.abs(axis);
function getTotalEnergy(positions, velocities) {
  return positions
    .map((position, i) => {
      const positionSum = position.reduce(sumReducer);
      const velocitySum = velocities[i].reduce(sumReducer);
      return positionSum * velocitySum;
    })
    .reduce(sumReducer);
}

function part1(rawInput) {
  const STEPS = 1000;
  let positions = parseInput(rawInput);
  let velocities = generateVelocities(positions);

  for (let step = 0; step < STEPS; step += 1) {
    const newVelocities = applyGravity(positions, velocities);
    const newPositions = applyVelocity(positions, newVelocities);
    [positions, velocities] = [newPositions, newVelocities];
  }
  return getTotalEnergy(positions, velocities);
}

function haveSameValue(A, B) {
  return JSON.stringify(A) === JSON.stringify(B);
}

function part2(rawInput) {
  const STEPS = 1000;
  let positions = parseInput(rawInput);
  positions = [
    [-8, -10, 0],
    [5, 5, 10],
    [2, -7, 3],
    [9, -8, -3]
  ];

  let velocities = generateVelocities(positions);
  const initialPositions = positions.map(position => [...position]);
  const initialVelocities = velocities.map(velocity => [...velocity]);

  for (let step = 0; step < STEPS; step += 1) {
    const newVelocities = applyGravity(positions, velocities);
    const newPositions = applyVelocity(positions, newVelocities);
    [positions, velocities] = [newPositions, newVelocities];
  }
  return STEPS;
}

module.exports = { part1, part2 };
