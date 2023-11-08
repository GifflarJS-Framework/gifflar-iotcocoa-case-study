export function jsonToCsv(data: any){
  let keys = ""
  let values = ""
  
  for(const prop in data){
    keys = keys.concat(prop, ",");
    values = values.concat(data[prop], ",")
  }

  // Removing last comma
  keys = keys.slice(0, -1)
  values = values.slice(0, -1)

  return {keys, values}
}