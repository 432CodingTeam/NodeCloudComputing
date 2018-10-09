function getTimeStmp (d) {
  let t = new Date(d)

  return t.getTime() / 1000
}


module.exports = {
  getTimeStmp,
}