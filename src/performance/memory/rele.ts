
import { mesureMemoryOf } from "performance/measuring-functions/mesureMemoryOf";
import IotService from "services/IotService";
import { IIoTSensorData } from "types/IIoTSensorData";
import "expose-gc"

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

export const memoryMesureRele = ()=>{
  const modelingTimePerformance = mesureMemoryOf("modeling", ()=>{
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
  
  const writingTimePerformance = mesureMemoryOf("writing", ()=>{
    // Writing contracts
    iotService.writeByName(sensors[0].data.name);
  },()=>{
    iotService = new IotService();
    iotService.createModel(sensors);
  })
  
  return {modeling: modelingTimePerformance, writing: writingTimePerformance}
}
