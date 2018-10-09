const Time = require("./Time")
const RL = require("readline")
const fs = require("fs")
const os = require("os")

let start = 1, end = 17770

function getPath (id) {
  let num = id.toString()
  let length = 7 - num.length
  while(length--) num = "0" + num

  return __dirname + "/mv_"+ id +".txt"
}

function getUSLike () {

  let rl = RL.createInterface({input: read})
  let index = 0

  rl.on('line', line => {

  })
}