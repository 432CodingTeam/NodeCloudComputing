const mathjs = require("mathjs")
const HashMap = require("hashmap")


class pushalgorithm {
  /**
   * 构造函数 
   */
  constructor() {
    this.map = new HashMap()
    this.all_listqid=new HashMap()//问题列表 自动生成添加 优化算法
  }

  handleQuestrionMap(qid)
  {
    if(this.all_listqid.get(qid)==null)
    {
      this.all_listqid.addData(qid,1)
    }
  }

  /**
   *添加数据
   * @param {包含用户id对qid感兴趣为weight} data 
   */
  addData(data) {
    this.handleQuestrionMap(data.qid)
    if (this.map.get(data.id) == null) {
      let mapone = new HashMap()
      mapone.set(data.qid, data.weight)
      let dataone = {
        uid: data.id,
        mapone: mapone,
        totalweight: data.weight
      }
      this.map.set(data.id, dataone)
    } else {
      let dataone = this.map.get(data.id)
      dataone['mapone'].set(data.qid, data.weight)
      dataone['totalweight'] += data.weight
    }
  }
  /**
   *添加数据列表
   * @param {*} datalist
   */
  addDataList(datalist) {
    for (var i = 0; u < listdata.length; i++) {
      this.addData(listdata[i])
    }
  }
  /**
   * 得到用户对象   （用户不存在null）
   * @param {用户id}} id 
   */
  getUserById(id) {
    return this.map.get(id)
  }
  /**
   * 得到用户U，V的相同感兴趣问题集合  （用户不存在列表为空）
   * @param {用户id} uid 
   * @param {用户id} vid 
   */
  getDegreeOfIQId(uid, vid) {
    let u = this.getUserById(uid),
      v = this.getUserById(vid)
    let listqid = []
    if (u == null || v == null) {
      return listqid
    }
    u['mapone'].forEach(function (value, key) {
      if (v['mapone'].get(key) != null) {
        listqid.push(key)
      }
    });
    return listqid;
  }
  /**
   * 得到用户的感兴趣度 （数据不合法为null）
   * @param {用户id} uid 
   * @param {问题id} qid 
   */
  getUserInterestByid(uid, qid) {
    let user = this.getUserById(uid)
    return user == null ? null : user['mapone'].get(qid)
  }
  /**
   * 得到两个用户的相似度 （用户不存在为null）
   * @param {用户id} uid 
   * @param {用户id} vid 
   */
  simUandV(uid, vid) {
    let u = this.getUserById(uid),
      v = this.getUserById(vid)
    if (u == null || v == null) {
      return null
    }
    let avgRu = u['totalweight'],
      avgRv = v['totalweight']
    let listqid = this.getDegreeOfIQId(u, v)
    let sim = 0.0 //结果
    let numberator = 0.0 //sim函数分子
    let denominatoru = 0.0,
      denominatorv = 0.0,
      denominator = 0.0 //sim函数分母
    //sim算法http://upy.iimt.me/WX20181007-144838.png
    try {
      for (var i = 0; i < listqid.length; i++) {
        let partu = (this.getUserInterestByid(uid, listqid[i]) - avgRu),
          partv = (this.getUserInterestByid(vid, listqid[i] - avgRv))

        numberator += (partu * partv) //求sim函数分子
        denominatoru += (partu * partu)
        denominatorv += (partv * partv)
      }
      denominator = mathjs.sqrt(denominatoru) * mathjs.sqrt(denominatorv)
      sim = numberator / denominator
    } catch (error) {
      return null
    }
    return sim
  }
  /**
   * 获取两个用户相似度
   * @param {用户id} uid 
   * @param {用户id} vid 
   */
  getSimUandV(uid, vid) {
    let temp = this.simMap.get(uid)
    let sim = temp == null ? null : temp.simMapone.get(vid)
    if (sim == null) {
      temp = this.simMap.get(vid)
      sim = temp == null ? null : temp.simMapone.get(uid)
    }
    return sim
  }
  /**
   * 建立相似度map矩阵
   */
  setSimMapMatrix() {

    let listid = []
    //获取id列表
    this.map.forEach(function (value, key) {
      listid.push(key)
    });

    for (var i = 0; i < listid.length; i++) {
      for (var j = 0; j < listid.length; j++) {
        //判断用户 i j 相似度并写入simMap
        let sim = this.simUandV(lisid[i], listid[j]) //获取相似度
        if (sim != null) {
          let user = this.getUserById(listid[i])
          if (user["simMapone"] == null) {
            let simMapone = new HashMap()
            simMapone.set(listid[j], sim)
            user["simMapone"] = simMapone
          }
          else {
            user["simMapone"].set(listid[j], sim)
          }
        }

      }
    }
  }
  /**
   * 获取用户对问题的预测感兴趣度
   * @param {用户id} uid 
   * @param {问题id} qid 
   */
  predictionInterestNumber(uid, qid) {
    let listvid = [], numberator = 0.0, denominator = 0.0//初始化vid列表 函数分子分母 http://upy.iimt.me/0703BD6E-408F-4DC7-ABAF-8812B1625F20.png
    let user = this.getUserById(uid)
    try {
      user.simMapone.forEach(function (value, key) {
        listvid.push(key)
      });
      for (var i = 0; i < listvid.length; i++) {
        Suv = this.getSimUandV(uid, listvid[i])
        numberator += (this.getUserInterestByid(listvid[i], qid) * Suv)
        denominator += Suv
      }
    }
    catch (error) {
      return null
    }
    return numberator / denominator
  }
  /**
   * 建立预测map矩阵
   */
  setPredictionMapMatrix()
  {
    this.map.forEach(function (value,key) {  
      value["predMapone"]=new HashMap()
      for(var i=0;i<this.all_listqid.size();i++)
      {
        value["predMapone"].set(key,this.all_listqid[i])
      }
    });
  }
}