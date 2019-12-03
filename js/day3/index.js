function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean).map(s => s.split(","))
}

function part1(rawInput) {
  const [wire1, wire2] = parseInput(rawInput);
  const reducer = ({ horizontal, vertical, x, y }, n) => {
    switch (n[0]) {
      case "L": {
        x0 = x;
        x = x - +n.slice(1);
        horizontal[y] = (horizontal[y] || []).concat([x, x0]);
        return { horizontal, vertical, x, y }
      }
      case "R": {
        x0 = x;
        x = x + +n.slice(1);
        horizontal[y] = (horizontal[y] || []).concat([x0, x]);
        return { horizontal, vertical, x, y }
      };
      case "U": {
        y0 = y;
        y = y + +n.slice(1);
        vertical[x] = (vertical[x] || []).concat([y0, y]);
        return { horizontal, vertical, x, y }
      }
      case "D": {
        y0 = y;
        y = y - +n.slice(1);
        vertical[x] = (vertical[x] || []).concat([y, y0]);
        return { horizontal, vertical, x, y }
      }
      default: return { horizontal, vertical, x, y }
    }
  };
  const wire1Dic = wire1.reduce(reducer, { horizontal: {}, vertical: {}, x: 0, y: 0 });
  const wire2Dic = wire2.reduce(reducer, { horizontal: {}, vertical: {}, x: 0, y: 0 });
  let min = Infinity;

  // we constructed an horizontal and vertical dictionnary for each wire.
  // for each direction, we try to find values in the other wire that go in the perpendicular direction
  // i.e.: go through wire1 horizontal lines trying to find overlapping wire2 vertical lines
  // and go throug wire1 vertical lines trying to find overlapping wire2 horizontal lines
  // TODO: this assumes that a line, per horizonal or vertical line, has only 1 range. Handle this corner case
  Object.entries(wire1Dic.horizontal).forEach(([k, v]) => {
    for (let i = v[0]; i < v[1]; i++) {
      const wire2Range = wire2Dic.vertical[i];
      if (wire2Range && k >= wire2Range[0] && k <= wire2Range[1]) {
        const distance = Math.abs(k) + Math.abs(i);
        if (distance > 0 && distance < min) min = distance
      }
    }
  })
  Object.entries(wire2Dic.horizontal).forEach(([k, v]) => {
    for (let i = v[0]; i < v[1]; i++) {
      const wire2Range = wire1Dic.vertical[i];
      if (wire2Range && k >= wire2Range[0] && k <= wire2Range[1]) {
        const distance = Math.abs(k) + Math.abs(i);
        if (distance > 0 && distance < min) min = distance
      }
    }
  })
  return min;
}
function part2(rawInput) {
  const [wire1, wire2] = parseInput(rawInput);
  const reducer = ({ horizontal, vertical, x, y, d }, n) => {
    // we keep the start and current distance `d` in order to calculate the final distance later
    // notice how we do not immediatly add the new value to the distance, since we do not know yet if we will travel all the way
    // in other words: we do not know if the intersection is at the middle of the range.
    // Thus, we keep the range, start and original distance to calculate it when it is neccesary to do so
    switch (n[0]) {
      case "L": {
        x0 = x;
        x = x - +n.slice(1);
        horizontal[y] = { range: [x, x0], d, start: x0 };
        d += +n.slice(1);
        return { horizontal, vertical, x, y, d }
      }
      case "R": {
        x0 = x;
        x = x + +n.slice(1);
        horizontal[y] = { range: [x0, x], d, start: x0 };
        d += +n.slice(1);
        return { horizontal, vertical, x, y, d }
      };
      case "U": {
        y0 = y;
        y = y + +n.slice(1);
        vertical[x] = { range: [y0, y], d, start: y0 }
        d += +n.slice(1);
        return { horizontal, vertical, x, y, d }
      }
      case "D": {
        y0 = y;
        y = y - +n.slice(1);
        vertical[x] = { range: [y, y0], d, start: y0 }
        d += +n.slice(1);
        return { horizontal, vertical, x, y, d }
      }
      default: return { horizontal, vertical, x, y, d }
    }
  };
  const wire1Dic = wire1.reduce(reducer, { horizontal: {}, vertical: {}, x: 0, y: 0, d: 0 });
  const wire2Dic = wire2.reduce(reducer, { horizontal: {}, vertical: {}, x: 0, y: 0, d: 0 });
  let min = Infinity;

  // Notice how we use the stored values in each horizontal or vertical line to get the true distance to the intersection
  // TODO: again, we assume that per horizontal/vertical line there is only one range. This may not be true. Handle such cases.
  Object.entries(wire1Dic.horizontal).forEach(([k, v]) => {
    for (let i = v.range[0]; i < v.range[1]; i++) {
      const wire2Value = wire2Dic.vertical[i];
      if (wire2Value && k >= wire2Value.range[0] && k <= wire2Value.range[1]) {
        const distance = wire2Value.d + v.d + Math.abs(v.start - i) + Math.abs(wire2Value.start - k);
        if (distance > 0 && distance < min) min = distance
      }
    }
  })
  Object.entries(wire2Dic.horizontal).forEach(([k, v]) => {
    for (let i = v.range[0]; i < v.range[1]; i++) {
      const wire2Value = wire1Dic.vertical[i];
      if (wire2Value && k >= wire2Value.range[0] && k <= wire2Value.range[1]) {
        const distance = wire2Value.d + v.d + Math.abs(v.start - i) + Math.abs(wire2Value.start - k);
        if (distance > 0 && distance < min) min = distance
      }
    }
  })
  return min;
}

module.exports = { part1, part2 };
