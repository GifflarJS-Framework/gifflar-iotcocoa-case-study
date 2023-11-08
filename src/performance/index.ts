import { dht11, rele } from "./sensors";
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