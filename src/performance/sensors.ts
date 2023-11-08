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