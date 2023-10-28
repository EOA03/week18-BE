const {MongoClient} = require("mongodb")

const dataMiddleware = async (req, res, next)=>{
  const mongoClient = await new MongoClient('mongodb://week18_shownfarup:29ad64249f075a2ff448812de53ab84e72959427@irq.h.filess.io:27017/week18_shownfarup').connect()
  db = mongoClient.db('week18_shownfarup')
  
  req.db = db
  
  next()
}

module.exports = dataMiddleware