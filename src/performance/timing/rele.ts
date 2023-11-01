
import { mesureTimeOf } from "performance/measuring-functions/mesureTimeOf";
import IotService from "services/IotService";
import { IIoTSensorData } from "types/IIoTSensorData";

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

export const timingMesureRele = ()=>{
  const modelingTimePerformance = mesureTimeOf("modeling", ()=>{
    // Creating model
    iotService.createModel(sensors);
  }, ()=>{
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

