const { lcm } = require("../utils");

const AXIS_COUNT = 3;
function parseInput(rawInput = "") {
  const input = rawInput
    .split("\n")
    .filter(Boolean)
    .map(entry =>
      entry
        .split(/[,<>=]/)
        .filter(Number)
        .map(Number)
    );
  // transform input to a per-axis array
  return Array(AXIS_COUNT)
    .fill()
    .map((_, i) => input.map(p => p[i]));
}

function generateVelocities(positions) {
  return positions.map(position => position.map(() => 0));
}

function applyGravityAxis(positions = [], velocities = []) {
  const n = [...velocities];
  for (let i = 0; i < positions.length; i += 1) {
    const position = positions[i];
    for (let j = i; j < positions.length; j += 1) {
      const otherPosition = positions[j];
      if (position > otherPosition) {
        n[i] += -1;
        n[j] += 1;
      } else if (position < otherPosition) {
        n[i] += 1;
        n[j] += -1;
      }
    }
  }
  return n;
}

function applyGravity(positions = [], velocities = []) {
  const xAxis = applyGravityAxis(positions[0], velocities[0]);
  const yAxis = applyGravityAxis(positions[1], velocities[1], 1);
  const zAxis = applyGravityAxis(positions[2], velocities[2], 2);
  return [xAxis, yAxis, zAxis];
}

function applyVelocity(positions, velocities) {
  return positions.map((position, i) =>
    position.map((moonEntry, j) => velocities[i][j] + moonEntry)
  );
}

const sumReducer = (sum, axis) => Math.abs(sum) + Math.abs(axis);
function getTotalEnergy(positions, velocities) {
  return Array(positions[0].length)
    .fill()
    .map((_, axis) => {
      // because positions and velocities are split by axis, we must map over them to get the right values
      const positionSum = positions.map(p => p[axis]).reduce(sumReducer);
      const velocitySum = velocities.map(v => v[axis]).reduce(sumReducer);
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

function isEqual(A, B) {
  return JSON.stringify(A) === JSON.stringify(B);
}

function part2(rawInput) {
  const MAX_STEPS = Number.MAX_SAFE_INTEGER;
  const allPositions = parseInput(rawInput);
  const allVelocities = generateVelocities(allPositions);

  const multipliers = [];
  // we calculate where we loop per axis
  // since these are independent of each other, we can then use the least common multiplier (lcm)
  // to get the actual minimum step at which position and velocities loop
  for (let axis = 0; axis < AXIS_COUNT; axis += 1) {
    let positions = allPositions[axis];
    let velocities = allVelocities[axis];

    // make deep copies of positions and velocities
    const initialPositions = JSON.parse(JSON.stringify(positions));
    const initialVelocities = JSON.parse(JSON.stringify(velocities));

    for (let step = 0; step < MAX_STEPS; step += 1) {
      const newVelocities = applyGravityAxis(positions, velocities);
      const newPositions = positions.map(
        (position, i) => newVelocities[i] + position
      );
      if (
        step > 0 &&
        isEqual(initialPositions, positions) &&
        isEqual(initialVelocities, velocities)
      ) {
        multipliers.push(step);
        break;
      }
      [positions, velocities] = [newPositions, newVelocities];
    }
  }
  if (multipliers.length === AXIS_COUNT) {
    return multipliers.reduce(lcm);
  }
  return MAX_STEPS;
}

module.exports = { part1, part2 };
