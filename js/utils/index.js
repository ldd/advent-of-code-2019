function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  if (b === 0) return 0;
  return (a * b) / gcd(a, b);
}

function randomInArray(A = []) {
  return A[Math.floor(Math.random() * A.length) % A.length];
}

module.exports = { gcd, lcm, randomInArray };
