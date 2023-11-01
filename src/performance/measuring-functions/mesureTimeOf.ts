import { parseHrtimeToSeconds } from "performance/utils/parse-hrmtime-to-secs"


interface IOptions{
  runs: number
  fixed: number
}

export function mesureTimeOf(name: string, func: ()=>void, options: IOptions = {runs:10, fixed:4}){
  const {runs, fixed} = options

  let mean = 0
  let min = 9999999
  let max = -1

  for(let i=0;i<runs;i++){
    const start = process.hrtime()
    func()
    const diffHrtime = process.hrtime(start)
    const secs = parseHrtimeToSeconds(diffHrtime)

    // calculating mean
    mean += secs

    // calculating min
    if(secs < min) min = secs

    // calculating max
    if(secs > max) max = secs
  }

  return {
    name, 
    mean: mean.toFixed(fixed), 
    min: min.toFixed(fixed),
    max: max.toFixed(fixed), 
    runs
  }
}