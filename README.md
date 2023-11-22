# Gifflar IoTCocoa case study and performance evaluation

## Run all performance tests

```
yarn performance
```

## Run individual performance test

```
yarn performance:it --sensor=rele --step=modeling --measure=time
```

`measure`: "time" | "memory" | "cpu"
`sensor`: "rele" | "dht11" | "servoMotor" | "airConditioner"
`step`: "modeling" | "writing"