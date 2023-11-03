
import { mesureMemoryOf } from "performance/measuring-functions/mesureMemoryOf";
import IotService from "services/IotService";
import { IIoTSensorData } from "types/IIoTSensorData";

let iotService = new IotService();

const sensors: Array<IIoTSensorData> = [
  {
    data: {
      name: "DHT11",
      values: [
        {
          idv: "temperature",
          type: "uint",
          default: "",
          max: "10",
          min: "0",
        },
        {
          idv: "humidity",
          type: "uint",
          default: "",
          max: "10",
          min: "0",
        },
      ],
    },
  },
];

export const memoryMesureDHT11 = ()=>{
  const modelingTimePerformance = mesureMemoryOf("modeling", ()=>{
    // Creating model
    iotService.createModel(sensors);
  },()=>{
    iotService = new IotService();
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

