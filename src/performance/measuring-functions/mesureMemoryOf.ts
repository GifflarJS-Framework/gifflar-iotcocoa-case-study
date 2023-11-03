interface IOptions{
  runs: number
  fixed: number
}

export function mesureMemoryOf(name: string, func: ()=>void, reset: ()=>void, options: IOptions = {runs:200, fixed:4}){
  const {runs, fixed} = options

  const _runs = runs+2

  let mean = 0
  let min = 9999999
  let max = -1

  for(let i=0;i<_runs;i++){
    let memoryUsedInKb = -1
    do{
      reset()
      const startMemoryUsedInKb = process.memoryUsage().heapUsed
      func()
      const endMemoryUsedInKb = process.memoryUsage().heapUsed
      memoryUsedInKb = endMemoryUsedInKb - startMemoryUsedInKb
      memoryUsedInKb =  (memoryUsedInKb / 1024 * 100) / 100;
    }while(memoryUsedInKb < 0);
    
    // Dropping the first two
    if(i > 2){
      // calculating mean
      mean += memoryUsedInKb
      
      // calculating min
      if(memoryUsedInKb < min) min = memoryUsedInKb
      
      // calculating max
      if(memoryUsedInKb > max) max = memoryUsedInKb
    }
  }

  mean = mean / runs

  return {
    name, 
    "mean (KB)": mean.toFixed(fixed),
    min: min.toFixed(fixed),
    max: max.toFixed(fixed),
    runs
  }
}