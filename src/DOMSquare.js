export default function DOMSquare(x, y, square) {

  function setEventListener(event, onTraverse){
    square.addEventListener(event, () => onTraverse(x, y));
  }

  function getDistance(targetX, targetY) {
    const offset = square.getBoundingClientRect();
    const xOffset = offset.left;
    const yOffset = offset.top;
    const distance = Math.sqrt(
      (targetX - xOffset) ** 2 + (targetY - yOffset) ** 2
    );
    return distance;
  }

  function getXY() {
    return [x, y];
  }

  return {
    setEventListener,
    getDistance,
    getXY,
  };
}
