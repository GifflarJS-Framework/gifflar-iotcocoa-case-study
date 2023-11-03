
import IotService from "services/IotService";
import { IIoTSensorData } from "types/IIoTSensorData";
import "expose-gc"
import { mesureCpuOf } from "performance/measuring-functions/mesureCpuOf";

let iotService = new IotService();

const sensors: Array<IIoTSensorData> = [
  {
    data: {
      name: "Rele",
      values: [
        {
          idv: "status",
          type: "bool",
          default: "false",
        },
      ],
    },
  },
];

export const cpuMesureRele = ()=>{
  const modelingTimePerformance = mesureCpuOf("modeling", ()=>{
    // Creating model
    iotService.createModel(sensors);
  }, ()=>{
    iotService = new IotService();
    if (typeof global.gc === 'function') {
      global.gc();
    } else {
      console.warn('Garbage collection unavailable. Use --expose-gc when launching Node.js.');
    }
  })
  
  const writingTimePerformance = mesureCpuOf("writing", ()=>{
    // Writing contracts
    iotService.writeByName(sensors[0].data.name);
  },()=>{
    iotService = new IotService();
    iotService.createModel(sensors);
  })
  
  return {modeling: modelingTimePerformance, writing: writingTimePerformance}
}
