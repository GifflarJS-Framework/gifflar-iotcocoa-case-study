
import { mesureTimeOf } from "performance/measuring-functions/mesureTimeOf";
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

export const timingMesureDHT11 = ()=>{
  const modelingTimePerformance = mesureTimeOf("modeling", ()=>{
    // Creating model
    iotService.createModel(sensors);
  },()=>{
    iotService = new IotService();
  })
  
  const writingTimePerformance = mesureTimeOf("writing", ()=>{
    // Writing contracts
    iotService.writeByName(sensors[0].data.name);
  },()=>{
    iotService = new IotService();
    iotService.createModel(sensors);
  })
  
  return {modeling: modelingTimePerformance, writing: writingTimePerformance}
}

