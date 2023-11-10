import { mesureCpuOf } from "performance/measuring-functions/mesureCpuOf";
import { mesureMemoryOf } from "performance/measuring-functions/mesureMemoryOf";
import { mesureTimeOf } from "performance/measuring-functions/mesureTimeOf";
import { IMeasureOptions } from "performance/measuring-functions/types/imeasure-options";
import { IMeasureReturn } from "performance/measuring-functions/types/imeasure-return";
import IotService from "services/IotService";
import fs from "node:fs"
import { jsonToCsv } from "./json-to-csv";
import { IIoTSensorData } from "types/IIoTSensorData";

type IMeasureType = "time" | "memory" | "cpu"

interface ITestFunctionProps{
  sensorsArg: Array<IIoTSensorData>;
  type?: IMeasureType;
  gifflarStep: "modeling" | "writing";
  options?: IMeasureOptions
}

interface IMeasureData{
  title: string,
  measureFunc: (name: string, func: ()=>void, reset: ()=>void, options?: IMeasureOptions) => IMeasureReturn
}

interface IMeasureDataByType{
  [x: string]: IMeasureData,
}

const measureDataByType: IMeasureDataByType = {
  time: {
    title: "TIMING (milisecs)",
    measureFunc: mesureTimeOf
  },
  memory: {
    title: "MEMORY (KB)",
    measureFunc: mesureMemoryOf
  },
  cpu: {
    title: "CPU (%)",
    measureFunc: mesureCpuOf
  }
}

let _type = "";
let _logOn = false
let _gcOn = false
let _dataLog: any = undefined

export function pTest({sensorsArg, type, gifflarStep, options}:ITestFunctionProps): any{
  if(type) _type = type;

    let iotService = new IotService();
    
    // Obtaining service function by gifflar step
    const serviceFuncByStep = {
      modeling: ()=> iotService.createModel(sensorsArg),
      writing: ()=> iotService.writeByName(sensorsArg[0].data.name)
    }

    const funcToBeTested = ()=>{
      // executing function
      serviceFuncByStep[gifflarStep]();
    }

    function reset(){
      // reset service
      iotService = new IotService();
      if(gifflarStep === "writing") iotService.createModel(sensorsArg);

      if(_gcOn){
        // Forcing garbage collector
        if (typeof global.gc === 'function') {
          global.gc();
        } else {
          console.warn('Garbage collection unavailable. Use --expose-gc when launching Node.js.');
        }
      }
    }

    // Testing function
    const data = measureDataByType[_type].measureFunc(gifflarStep, funcToBeTested, reset, options)

    
    if(!_dataLog) _dataLog = {};
    _dataLog[gifflarStep] = data;
    

    return data;
}

interface ITestGroupProps{
  name: string;
  type: IMeasureType
  outCsvFilePath?: string
  logOn?: boolean
  gcOn?: boolean
}

export function pTestGroup({type, name, outCsvFilePath, logOn = false, gcOn = false}: ITestGroupProps, callback: ()=>void){
    if(logOn){
      _logOn = true;
      console.log(measureDataByType[type].title);
      console.group();
  
      console.log(name);
      console.group();
    }

    if(gcOn) _gcOn = gcOn;

    _type = type
    callback()


    if(_dataLog) {
      if(logOn) console.table(_dataLog);

      if(outCsvFilePath){
        for(const prop in _dataLog){
          const csvData = jsonToCsv(_dataLog[prop]);
          if(fs.existsSync(outCsvFilePath)){
            fs.writeFileSync(outCsvFilePath, `${csvData.values}\n`, {encoding: "utf-8", flag: "a"});
          }else{
            fs.writeFileSync(outCsvFilePath, `${csvData.keys}\n${csvData.values}\n`, {encoding: "utf-8", flag: "w"});
          }
        }
      }
    }


    _logOn = false
    _dataLog = {}
    _gcOn = false
}