export const rele = [
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
]

export const dht11 = [
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
]

export const servoMotor = [
  {
    data: {
      name: "ServoMotor",
      values: [
        {
          idv: "position",
          type: "uint",
          default: "0",
          max: "180",
          min: "0",
        },
        {
          idv: "speed",
          type: "uint",
          default: "10",
          max: "255",
          min: "0",
        },
        {
          idv: "isMoving",
          type: "bool",
          default: "false",
        },
        {
          idv: "torque",
          type: "uint",
          default: "4",
        },
      ],
    },
  },
]

export const airConditioner = [
  {
    data: {
      name: "AirConditioner",
      values: [
        {
          idv: "temperature",
          type: "uint",
          default: "0",
          max: "30",
          min: "10",
        },
        {
          idv: "speed",
          type: "uint",
          default: "10",
          max: "100",
          min: "0",
        },
        {
          idv: "mode",
          type: "string",
          default: "'cool'",
        },
        {
          idv: "turnOffIn",
          type: "uint",
          default: "0",
        },
        {
          idv: "isHumidifierOn",
          type: "bool",
          default: "false",
        },
        {
          idv: "isOn",
          type: "bool",
          default: "false",
        },
        {
          idv: "isSwinging",
          type: "bool",
          default: "false",
        },
      ],
    },
  },
]