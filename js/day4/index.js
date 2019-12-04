function parseInput(rawInput = "") {
  return rawInput.split("-").map(Number);
}

// without regex magic, all we have is a count for all digits from 0 to 9
// we want to evaluate a condition that at least one of these counts matches
const initialCount = Array(10).fill(0);
function hasValidDigits(digits, condition) {
  let counts = [...initialCount];
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) return false;
    if (digits[i] === digits[i + 1]) counts[digits[i]]++;
  }
  return counts.some(condition)
}

function part1(rawInput, condition = count => count >= 1) {
  const [begin, end] = parseInput(rawInput);
  let count = 0;
  for (let i = begin; i < end; i++) {
    const digits = String(i).split("").map(Number);
    if (hasValidDigits(digits, condition)) count++;
  }
  return count;
}

// instead of asking for at least 1 repetition, like in part 1
// we ask for exactly 1 repetition
function part2(rawInput) {
  return part1(rawInput, count => count == 1);
}

module.exports = { part1, part2 };
