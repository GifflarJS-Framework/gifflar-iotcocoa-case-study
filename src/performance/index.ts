import { cpuMesureDHT11 } from "./cpu/dht11";
import { cpuMesureRele } from "./cpu/rele";
import { memoryMesureDHT11 } from "./memory/dht11";
import { memoryMesureRele } from "./memory/rele";
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

// Memory
console.log("MEMORY");
console.group();

console.log("RELE");
console.group();
console.table(memoryMesureRele())
console.groupEnd();

console.log("DHT11");
console.group();
console.table(memoryMesureDHT11())
console.groupEnd();

console.groupEnd();

// CPU
console.log("CPU");
console.group();

console.log("RELE");
console.group();
console.table(cpuMesureRele())
console.groupEnd();

console.log("DHT11");
console.group();
console.table(cpuMesureDHT11())
console.groupEnd();

console.groupEnd();