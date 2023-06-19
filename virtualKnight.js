const knightOnChessboard = (() => {
  let x = 0;
  let y = 0;
  const SIZE_CAP = 8; //don't want any shenanigans for now

  const placeKnightAt = (xNew, yNew) => {
    x = xNew;
    y = yNew;
  };

  const findShortestPathTo = (xTarget, yTarget) => {
    let depth = 0;
    while (true && depth < SIZE_CAP) {
      const path = traverseTo(x, y, xTarget, yTarget, depth);
      if (path !== false) return path;
      depth += 1;
    }
    return false;
  };

  const traverseTo = (xCur, yCur, xTarget, yTarget, depth) => {
    if (depth === 0) {
      if (xCur === xTarget && yCur === yTarget) return [[xCur, yCur]];
      return false;
    }
    if (xCur > SIZE_CAP || yCur > SIZE_CAP) return false;
    let path =
      traverseTo(xCur + 1, yCur + 2, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur + 2, yCur + 1, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur + 2, yCur - 1, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur + 1, yCur - 2, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur - 1, yCur - 2, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur - 2, yCur - 1, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur - 2, yCur + 1, xTarget, yTarget, depth - 1) ||
      traverseTo(xCur - 1, yCur + 2, xTarget, yTarget, depth - 1);
    if (path !== false) path = [[xCur, yCur], ...path];
    return path;
  };

  return {
    placeKnightAt,
    findShortestPathTo,
  };
})();
