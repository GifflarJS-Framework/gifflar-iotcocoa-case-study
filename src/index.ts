import { airConditioner, dht11, rele, servoMotor } from "performance/sensors";
import IotService from "./services/IotService";
import { IIoTSensorData } from "./types/IIoTSensorData";
import fs from "fs";

const iotService = new IotService();

iotService.createModel(rele.concat(dht11, servoMotor, airConditioner));

// Writing contracts
const codeDHT11 = iotService.writeByName(rele[0].data.name);
const codeRele = iotService.writeByName(dht11[0].data.name);
const codeServo = iotService.writeByName(servoMotor[0].data.name);
const codeAirConditioner = iotService.writeByName(airConditioner[0].data.name);


// Saving contracts to a file
fs.mkdirSync("./src/contracts", { recursive: true });
fs.writeFile(
  "./src/contracts/DHT11Contract.sol",
  codeDHT11,
  { flag: "w" },
  (err: Error | null) => {
    if (err) throw err;
  }
);
fs.writeFile(
  "./src/contracts/ReleContract.sol",
  codeRele,
  { flag: "w" },
  (err: Error | null) => {
    if (err) throw err;
  }
);
fs.writeFile(
  "./src/contracts/ServoContract.sol",
  codeServo,
  { flag: "w" },
  (err: Error | null) => {
    if (err) throw err;
  }
);
fs.writeFile(
  "./src/contracts/AirConditionerContract.sol",
  codeAirConditioner,
  { flag: "w" },
  (err: Error | null) => {
    if (err) throw err;
  }
);
