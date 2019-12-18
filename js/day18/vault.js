const generateVault = A =>
  (tiles => {
    const [WALL, SPACE] = ["#", "."];
    const keyRegex = /[a-z]/;
    const doorRegex = /[A-Z]/;
    let doors = {};
    let keys = {};
    let position = [];

    function getDoors(A) {}
    function getInitialKeys(A) {
      const newKeys = {};
      A.forEach((line, i) =>
        line.forEach((tile, j) => {
          if (keyRegex.test(tile)) newKeys[`${i},${j}`] = tile;
        })
      );
      return newKeys;
    }
    function getStartingPosition(A) {
      let currentPosition = [];
      A.some((line, i) =>
        line.some((tile, j) => {
          currentPosition = [i, j];
          return tile === "@";
        })
      );
      return currentPosition;
    }

    function reset(A = []) {
      doors = getDoors(A);
      keys = getInitialKeys(A);
      position = getStartingPosition(A);
      return keys;
    }

    return { reset };
  })(A);

module.exports = { generateVault };
