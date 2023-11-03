interface IOptions{
  runs: number
  fixed: number
}

export function mesureCpuOf(name: string, func: ()=>void, reset: ()=>void, options: IOptions = {runs:200, fixed:4}){
  const {runs, fixed} = options

  const _runs = runs+2

  let mean = 0
  let min = 9999999
  let max = -1

  for(let i=0;i<_runs;i++){
    let cpuUsagePercentage = -1
    do{
      reset()
      const startCpuUsedInKb = process.cpuUsage().user
      func()
      const endCpuUsedInKb = process.cpuUsage().user
      cpuUsagePercentage = endCpuUsedInKb - startCpuUsedInKb
      cpuUsagePercentage =  100 * (cpuUsagePercentage / 10000)
      
    }while(cpuUsagePercentage < 0);
    
    // Dropping the first two
    if(i > 2){
      // calculating mean
      mean += cpuUsagePercentage
      
      // calculating min
      if(cpuUsagePercentage < min) min = cpuUsagePercentage
      
      // calculating max
      if(cpuUsagePercentage > max) max = cpuUsagePercentage
    }
  }

  mean = mean / runs

  return {
    name, 
    "mean (%)": mean.toFixed(fixed),
    min: min.toFixed(fixed),
    max: max.toFixed(fixed),
    runs
  }
}