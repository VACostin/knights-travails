/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
const DOMKnight = (() => {
  let knightDOM = document.querySelector("#horseIcon");
  const actualBoard = document.querySelector("#actualBoard");
  const targetDOM = document.querySelector("#targetIcon");
  const body = document.querySelector("body");

  const placeAt = (x, y) => {
    knightDOM.style.top = "auto";
    knightDOM.style.left = `${1 + x * 12.5}%`;
    knightDOM.style.bottom = `${1 + y * 12.5}%`;
  };

  const placeTarget = (x, y) => {
    targetDOM.style.left = `${1 + x * 12.5}%`;
    targetDOM.style.bottom = `${1 + y * 12.5}%`;
    targetDOM.style.display = "inline";
  };

  const hideTarget = () => {
    targetDOM.style.display = "none";
    targetDOM.style.left = "auto";
    targetDOM.style.bottom = "auto";
  };

  const refreshKnight = (x, y) => {
    body.style.pointerEvents = "auto";
    knightDOM.remove();
    knightDOM = knightDOM.cloneNode();
    actualBoard.insertBefore(knightDOM, actualBoard.firstChild);
    placeAt(x, y);
    hideTarget();
  }

  const traversePath = async (path) => {
    let x;
    let y;
    body.style.pointerEvents = "none";
    const timeDuration = 1000;
    [x, y] = [...path.shift()];
    const options = {
      duration: timeDuration,
      iterations: 1,
      fill: "forwards",
    };
    while (path.length > 0) {
      let xTarget;
      let yTarget;
      // eslint-disable-next-line prefer-const
      [xTarget, yTarget] = [...path.shift()];
      const traverseL = [
        { left: `${1 + x * 12.5}%`, bottom: `${1 + y * 12.5}%` },
        { left: `${1 + xTarget * 12.5}%`, bottom: `${1 + yTarget * 12.5}%` },
      ];
      knightDOM.animate(traverseL, options);
      if (path.length === 0)
        await new Promise((r) => setTimeout(r, timeDuration));
      else await new Promise((r) => setTimeout(r, timeDuration * 1.3));
      x = xTarget;
      y = yTarget;
    }
    refreshKnight(x, y);
  };

  const moveKnight = function (e) {
    const boardWidth = actualBoard.clientWidth;
    const boardHeight = actualBoard.clientHeight;
    const offset = actualBoard.getBoundingClientRect();
    const x = e.pageX - offset.left - boardWidth / 25;
    const y = e.pageY - offset.top - boardHeight / 25;
    knightDOM.style.left = `${x}px`;
    knightDOM.style.top = `${y}px`;
  };

  const getKnightPosition = () => {
    const offset = knightDOM.getBoundingClientRect();
    return [offset.left, offset.top];
  };

  const setEventListener = (trigger, callback) => {
    knightDOM.addEventListener(trigger, callback);
  };

  const followCursor = () => {
    actualBoard.addEventListener("mousemove", moveKnight);
  };

  const unfollowCursor = () => {
    actualBoard.removeEventListener("mousemove", moveKnight);
  };

  return {
    placeAt,
    placeTarget,
    traversePath,
    getKnightPosition,
    setEventListener,
    followCursor,
    unfollowCursor,
  };
})();

export default DOMKnight;
