# Gifflar IoTCocoa case study and performance evaluation

## Run all performance tests

```
yarn performance
```

This will generate a csv file inside `src/out` folder for each performance test. The csv file will contain the `mean`, `max` and `min` values of all the repetitions the code mande. The default repetitions is `200`, that is, the performance test will run the test `200` times (you can change this later).

## Run individual performance test

```
yarn performance:it --sensor=rele --step=modeling --measure=time
```

`measure`: "time" | "memory" | "cpu"
`sensor`: "rele" | "dht11" | "servoMotor" | "airConditioner"
`step`: "modeling" | "writing"

This will generate a csv file inside `src/out` folder of this unique performance test. The csv file will contain the `mean`, `max` and `min` values of all the repetitions the code mande. The default repetitions is `200`, that is, the performance test will run the test `200` times (you can change this later).

**Generating all the repetition results**
You might want to receive the data result from each repetition, that is, generate the `200` output values. For that, you can go to the `src/performance/measuring-functions` and uncomment a single line in each measure function.

`measureTimeOf`:

```javascript
    [...]
    
    // *Uncomment this next line to get the data for each repetition
    // console.log(secs);

    [...]
```

`measureMemoryOf`:

```javascript
    [...]
    
    // *Uncomment this next line to get the data for each repetition
    // console.log(memoryUsedInKb);

    [...]
```

`measureCpuOf`:

```javascript
    [...]
    
    // *Uncomment this next line to get the data for each repetition
    // console.log(cpuUsagePercentage);

    [...]
```

Then you can use the scripts in `scripts/performance` to execute each performance test. For example, if you want to run the `modeling` step of gifflar using the `rele` actuator as test entry and testing the `time` execution, you should run:

```bash
./src/scripts/performance/rele/time_modeling.sh
```

before running that command, you might need to give permission to the user to execute this script:

```bash
chmod 777 ./src/scripts/performance/rele/time_modeling.sh
```

These will generate `.txt` files inside `src/out` folder, each `.txt` file corresponds to the individual performance test executed. They will look like the files inside [results/](https://github.com/GifflarJS-Framework/gifflar-iotcocoa-case-study/tree/main/results) folder.

`Note`: Remember to run these tests in an isolated machine. Close all the unneeded apps, close the text editor, turn the WiFi and Bluetooth off, and run the tests in the terminal.