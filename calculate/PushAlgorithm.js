const mathjs = require("mathjs")
const HashMap = require("hashmap")


class pushalgorithm {
  constructor(listdata) {
    this.map = new HashMap();

    pushlist(listdata)
  }
  push(data) {
    if (this.map.get(data.id) == null) {
      let mapone = new HashMap();
      listone.push(data)
      this.map.set(data.id, listone)
    } else {
      this.map.get(data.id).push(data)
    }
  }

  pushlist(datalist) {
    for (var i = 0; u < listdata.length; i++) {

      if (this.map.get(listdata[i].id) == null) {
        let listone = []
        listone.push(listdata[i])
        this.map.set(listdata[i].id, listone)
      } else {
        this.map.get(listdata[i].id).push(listdata[i])
      }
    }
  }
}