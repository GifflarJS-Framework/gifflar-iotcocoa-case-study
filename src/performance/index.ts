import { timingMesureRele } from "./timing/rele";

// Timing
console.log("TIMING");
console.group();

console.log("RELE");
console.group();
const data = timingMesureRele()
console.table(data)
console.groupEnd();

console.groupEnd();