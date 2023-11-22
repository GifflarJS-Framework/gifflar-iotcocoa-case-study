import { airConditioner, dht11, rele, servoMotor } from "./sensors";
import { pTest, pTestGroup } from "./utils/test";
import {resolve} from "node:path"

type MeasureType = "time" | "memory" | "cpu"
type StepType = "modeling" | "writing"
interface SensorByName{
  [x: string]: {data: any}[]
}

const sensorNameArg = process.argv.filter(item=>{
  return item.includes("--sensor=")
})[0]

const stepArg = process.argv.filter(item=>{
  return item.includes("--step=")
})[0]

const measureArg = process.argv.filter(item=>{
  return item.includes("--measure=")
})[0]

if(!sensorNameArg || !stepArg || !measureArg){
  throw new Error("Invalid args.")
}

const sensorByName: SensorByName = {
  rele: rele,
  dht11: dht11,
  servoMotor: servoMotor,
  airConditioner: airConditioner
}

const sensorName: string = sensorNameArg.replace("--sensor=", "")
const step: StepType = stepArg.replace("--step=", "") as any;
const measure: MeasureType = measureArg.replace("--measure=", "") as any;

if(measure !== "time" && measure !== "memory" && measure !== "cpu"){
  throw new Error("Measure should be 'time', 'memory' or 'cpu'");
}

// Running test
pTestGroup({type: measure, name: sensorName, logOn: false, outCsvFilePath: resolve(__dirname, "out", `${measure}_${sensorName}.csv`)}, ()=>{
  pTest({
    sensorsArg: sensorByName[sensorName],
    gifflarStep: step,
  })
})