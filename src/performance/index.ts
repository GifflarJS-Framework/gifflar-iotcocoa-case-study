import { timingMesureDHT11 } from "./timing/dht11";
import { timingMesureRele } from "./timing/rele";

// Timing
console.log("TIMING");
console.group();

console.log("RELE");
console.group();
console.table(timingMesureRele())
console.groupEnd();

console.log("DHT11");
console.group();
console.table(timingMesureDHT11())
console.groupEnd();

console.groupEnd();