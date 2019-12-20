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

// Knuth-Fisher-Yates shuffle
function shuffle(A = []) {
  let temp;
  for (let i = A.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    temp = A[i];
    A[i] = A[j];
    A[j] = temp;
  }
  return A;
}
module.exports = { gcd, lcm, randomInArray, shuffle };
