import { Directions, InitialPositionObj } from "./types";

const moveRobot = (
  direction: string,
  x: number,
  y: number,
  distance: number
): { x: number; y: number } => {
  switch (direction) {
    case "N":
      return { x, y: (y + distance) % 100 };
    case "S":
      return { x, y: (y - distance + 100) % 100 };
    case "E":
      return { x: (x + distance) % 100, y };
    case "W":
      return { x: (x - distance + 100) % 100, y };
    default:
      return { x: 0, y: 0 };
  }
};

const checkDirection = (
  direction: Directions,
  rotationCount: number
): Directions => {
  const directions = ["N", "E", "S", "W"] as Directions[];
  const idx = directions.indexOf(direction);
  const newIdx = (idx + rotationCount) % 4;
  return directions[newIdx];
};

export const executeMovement = (
  initialPosition: InitialPositionObj,
  movements: string[]
): InitialPositionObj => {
  let { direction, x, y } = initialPosition;

  for (const movement of movements) {
    const action = movement[0] as "M" | "L" | "R";
    const distance = parseInt(movement.slice(1)) || 1; // Defaulting to 1 if number doesn't exist

    switch (action) {
      case "M":
        let coOrdinates = moveRobot(direction, x, y, distance);
        x = coOrdinates.x;
        y = coOrdinates.y;
        break;
      case "L":
        direction = checkDirection(direction, 3 * distance);
        break;
      case "R":
        direction = checkDirection(direction, distance);
        break;
    }
  }

  return { direction, x, y };
};
