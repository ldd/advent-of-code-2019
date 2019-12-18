const fs = require("fs");

function getInput(day = 1) {
  try {
    const rawInput = fs.readFileSync(`input/day${day}.txt`).toString();
    return rawInput;
  } catch (error) {
    //file doesn't exist
    if (error.code === "ENOENT") console.log("File doesn't exist. Wrong day?");
    else console.log(error);
  }
}

const day = process.argv[2];
if (day) {
  const input = getInput(day);
  const { part1, part2 } = require(`./js/day${day}/index.js`);
  console.log("part 1's result:\t", part1(input));
  console.log("part 2's result:\t", part2(input));
}
