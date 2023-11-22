import fs from "fs";
import { Directions, InitialPositionObj } from "./types";
import { executeMovement } from "./util";

try {
  const inputLines = fs.readFileSync("src/input.txt", "utf-8").split("\n");

  const initialPosition = inputLines[0].split(" ");
  const movements: string[] = inputLines[1].match(/[A-Z]\d*/g) || [];

  const initialPositionObj: InitialPositionObj = {
    direction: initialPosition[0] as Directions,
    x: parseInt(initialPosition[1]),
    y: parseInt(initialPosition[2]),
  };

  const result = executeMovement(initialPositionObj, movements);
  console.log(`${result.direction} ${result.x} ${result.y}`);
} catch (e) {
  console.log("Unable to process due to:", e);
}
