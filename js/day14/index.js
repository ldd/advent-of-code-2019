function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .map(reaction => reaction.split(/[( => )(, )]/).filter(Boolean))
    .filter(e => e.length > 0);
}

function getAllRecipes(A = []) {
  return A.reduce((recipes, n) => {
    const left = n.slice(0, -2);
    const right = n.slice(-2);

    const ingredients = [];
    // odds store value, even variables
    for (let i = 0; i < left.length; i += 2) {
      const [quantity, ingredient] = [+left[i], left[i + 1]];
      ingredients.push([quantity, ingredient]);
    }
    const [quantity, recipe] = [+right[0], right[1]];
    recipes[recipe] = { quantity, ingredients };

    return { ...recipes };
  }, {});
}

function performReaction(allRecipes, n = 1) {
  const inventory = {};

  function triggerReaction(recipeKey, amount) {
    const { ingredients, quantity: recipeQuantity } = allRecipes[recipeKey];
    const neededRatio = Math.ceil(amount / recipeQuantity);

    ingredients.forEach(entry => {
      const [quantity, ingredient] = entry;
      const newQuantity = quantity * neededRatio;
      inventory[ingredient] = inventory[ingredient] || 0;
      const neededQuantity = newQuantity - inventory[ingredient];
      if (ingredient !== "ORE" && neededQuantity > 0) {
        triggerReaction(ingredient, neededQuantity);
      }
      inventory[ingredient] -= newQuantity;
    });
    inventory[recipeKey] = inventory[recipeKey] || 0;
    inventory[recipeKey] += neededRatio * recipeQuantity;
    return inventory;
  }

  return triggerReaction("FUEL", n);
}

function part1(rawInput) {
  const A = parseInput(rawInput);

  const allRecipes = getAllRecipes(A);
  const { ORE } = performReaction(allRecipes, 1);
  return Math.abs(ORE);
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return +A;
}

module.exports = { part1, part2 };
