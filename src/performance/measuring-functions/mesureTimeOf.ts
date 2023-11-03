import { parseHrtimeToMiliseconds } from "performance/utils/parse-hrmtime-to-milisecs"


interface IOptions{
  runs: number
  fixed: number
}

export function mesureTimeOf(name: string, func: ()=>void, reset: ()=>void, options: IOptions = {runs:200, fixed:4}){
  const {runs, fixed} = options

  const _runs = runs+2

  let mean = 0
  let min = 9999999
  let max = -1

  for(let i=0;i<_runs;i++){
    reset()
    const start = process.hrtime()
    func()
    const diffHrtime = process.hrtime(start)
    const secs = parseHrtimeToMiliseconds(diffHrtime)
    
    
    // Dropping the first two
    if(i > 2){
      // calculating mean
      mean += secs
      
      // calculating min
      if(secs < min) min = secs
      
      // calculating max
      if(secs > max) max = secs
    }
  }

  mean = mean / runs

  return {
    name, 
    "mean (milisecs)": mean.toFixed(fixed),
    min: min.toFixed(fixed),
    max: max.toFixed(fixed),
    runs
  }
}