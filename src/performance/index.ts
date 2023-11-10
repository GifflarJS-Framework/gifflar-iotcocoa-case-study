import { airConditioner, dht11, rele, servoMotor } from "./sensors";
import { pTest, pTestGroup } from "./utils/test";
import {resolve} from "node:path"

// Timing
pTestGroup({type: "time", name: "RELE", logOn: false, outCsvFilePath: resolve(__dirname, "out", "timing_rele.csv")}, ()=>{
  pTest({
    sensorsArg: rele,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: rele,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "time", name: "DHT11", logOn: false, outCsvFilePath: resolve(__dirname, "out", "timing_dht11.csv")}, ()=>{
  pTest({
    sensorsArg: dht11,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: dht11,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "time", name: "ServoMotor", logOn: false, outCsvFilePath: resolve(__dirname, "out", "timing_servo.csv")}, ()=>{
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "time", name: "AirConditioner", logOn: false, outCsvFilePath: resolve(__dirname, "out", "timing_airconditioner.csv")}, ()=>{
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "writing",
  })
})

// Memory
pTestGroup({type: "memory", name: "RELE", logOn: false, gcOn: true, outCsvFilePath: resolve(__dirname, "out", "memory_rele.csv")}, ()=>{
  pTest({
    sensorsArg: rele,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: rele,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "memory", name: "DHT11", logOn: false, gcOn: true, outCsvFilePath: resolve(__dirname, "out", "memory_dht11.csv")}, ()=>{
  pTest({
    sensorsArg: dht11,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: dht11,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "memory", name: "ServoMotor", logOn: false, gcOn: true, outCsvFilePath: resolve(__dirname, "out", "memory_servo.csv")}, ()=>{
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "memory", name: "AirConditioner", logOn: false, gcOn: true, outCsvFilePath: resolve(__dirname, "out", "memory_airconditioner.csv")}, ()=>{
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "writing",
  })
})

// CPU
pTestGroup({type: "cpu", name: "RELE", logOn: false, outCsvFilePath: resolve(__dirname, "out", "cpu_rele.csv")}, ()=>{
  pTest({
    sensorsArg: rele,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: rele,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "cpu", name: "DHT11", logOn: false, outCsvFilePath: resolve(__dirname, "out", "cpu_dht11.csv")}, ()=>{
  pTest({
    sensorsArg: dht11,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: dht11,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "cpu", name: "ServoMotor", logOn: false, outCsvFilePath: resolve(__dirname, "out", "cpu_servo.csv")}, ()=>{
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: servoMotor,
    gifflarStep: "writing",
  })
})

pTestGroup({type: "cpu", name: "AirConditioner", logOn: false, outCsvFilePath: resolve(__dirname, "out", "cpu_airconditioner.csv")}, ()=>{
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "modeling",
  })
  
  pTest({
    sensorsArg: airConditioner,
    gifflarStep: "writing",
  })
})