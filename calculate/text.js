const HashMap=require("hashmap")


let map = new HashMap()
let mapone =new HashMap()
mapone.set("2","qwe")
data={
  mapone:mapone,
  id:"df"
}

map.set("1",data)

let one=map.get("1")

console.log(one['mapone'].get("2"))

one.mapone.set("3","etty")

console.log(one['mapone'].get("3"))
console.log(map.get("1")['mapone'].get("3"))