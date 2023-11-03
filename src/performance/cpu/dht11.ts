
import { mesureCpuOf } from "performance/measuring-functions/mesureCpuOf";
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

export const cpuMesureDHT11 = ()=>{
  const modelingTimePerformance = mesureCpuOf("modeling", ()=>{
    // Creating model
    iotService.createModel(sensors);
  },()=>{
    iotService = new IotService();
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

