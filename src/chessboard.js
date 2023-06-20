import virtualKnight from "./virtualKnight";
import DOMKnight from "./DOMKnight";
import DOMSquare from "./DOMSquare";

export default function chessboard() {
  let xCurrent = 0;
  let yCurrent = 0;
  const squareArray = [];

  function pickHorse() {
    DOMKnight.followCursor();
  }

  function releaseHorse() {
    DOMKnight.unfollowCursor();
    const XY = DOMKnight.getKnightPosition();
    let shortestDistance = 100000;
    let knightSquare;
    squareArray.forEach((square) => {
      const distance = square.getDistance(...XY);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        knightSquare = square;
      }
    });
    [xCurrent, yCurrent] = [...knightSquare.getXY()];
    virtualKnight.placeAt(xCurrent, yCurrent);
    DOMKnight.placeAt(xCurrent, yCurrent);
  }

  async function traversePath(x, y) {
    if (x !== xCurrent || y !== yCurrent) {
      DOMKnight.placeTarget(x, y);
      const path = virtualKnight.findShortestPathTo(x, y);
      await DOMKnight.traversePath(path);
      DOMKnight.setEventListener("mousedown", pickHorse);
      DOMKnight.setEventListener("mouseup", releaseHorse);
      virtualKnight.placeAt(x, y);
    }
  }

  function init() {
    virtualKnight.placeAt(xCurrent, yCurrent);
    DOMKnight.placeAt(xCurrent, yCurrent);
    DOMKnight.setEventListener("mousedown", pickHorse);
    DOMKnight.setEventListener("mouseup", releaseHorse);

    const rows = document.querySelectorAll(".row");
    let y = 7;
    rows.forEach((row) => {
      const squares = row.querySelectorAll(".square");
      let x = 0;
      squares.forEach((square) => {
        // eslint-disable-next-line no-plusplus
        const chessSquare = DOMSquare(x++, y, square);
        chessSquare.setEventListener("click", traversePath);
        squareArray.push(chessSquare);
      });
      y -= 1;
    });
  }

  return {
    init,
  };
}
