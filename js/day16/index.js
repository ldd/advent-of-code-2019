function parseInput(rawInput = "") {
  return rawInput
    .split("")
    .filter(entry => /[0-9]/.test(entry))
    .map(Number);
}

const pattern = [0, 1, 0, -1];

function calculateBrutePattern(A = []) {
  const results = [];
  for (let i = 0; i < A.length; i += 1) {
    let sum = 0;
    // start at i because pattern[0] is 0, so we can ignore anything where j < i
    for (let j = i; j < A.length; j += 1) {
      const pick = pattern[Math.floor((j + 1) / (i + 1)) % pattern.length];
      sum += pick * A[j];
    }
    sum = Math.abs(sum) % 10;
    results.push(sum);
  }
  return results;
}

function printResults(B = [], end = 8, start = 0) {
  return +B.slice(start, end).join("");
}

function iterate(A = [], start = 0, resolver = calculateBrutePattern) {
  let result = A;
  const PHASES = 100;
  for (let i = 0; i < PHASES; i += 1) {
    result = resolver(result, start);
  }
  return printResults(result, start + 8, start);
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return iterate(A);
}

// Using this function for indexes of A.
// constraints: index > A.length/2.
// we only need to do partialSums because pattern[0] is 0 and pattern[1] is 1
// so we will only have 1's for certain indexes
function calculateSumPattern(A) {
  const totalSums = [];
  const results = [];
  // we loop from the end to memoize sums
  for (let i = A.length - 1; i >= 0; i -= 1) {
    const prevPosition = A.length - i - 2;
    const sum = (totalSums[prevPosition] || 0) + A[i];
    totalSums.push(sum);
    results.push(sum % 10);
  }
  return results.reverse();
}

function calculatePattern(A, start) {
  if (start > A.length / 2) return calculateSumPattern(A);
  return calculateBrutePattern(A);
}

function repeatInput(input) {
  return input
    .join("")
    .repeat(1e4)
    .split("")
    .map(Number);
}

function part2(rawInput) {
  let input = parseInput(rawInput);
  input = repeatInput(input);

  const start = printResults(input, 7);
  return iterate(input, start, calculatePattern);
}

module.exports = { part1, part2 };
