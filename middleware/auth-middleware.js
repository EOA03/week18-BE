const jwt = require("jsonwebtoken")
const JWT_SIGN = process.env.JWT_SIGN;

const adminMiddleware = (req, res, next)=>{
  const authHeader = req.headers.authorization
  
  if(!authHeader){
    res.status(401).json({error: "Unauthorized"})
  } else{
    const token = authHeader.split(' ')[1]
    
    try{
      const decodedToken = jwt.verify(token, JWT_SIGN)
      if(decodedToken.role === "admin"){
        next()
      } else{
        res.status(401).json({error: "Unauthorized"})
      }
    } catch(error){
      res.status(400).json({error: error.message})
    }
  }
}

const userChecking = (req, res, next)=>{
  const username = req.params.username
  const authHeader = req.headers.authorization
    
  if(!authHeader){
    return res.status(401).json({error: "Unauthorized"})
  }
    
  const token = authHeader.split(' ')[1]
  try{
    const decodedToken = jwt.verify(token, JWT_SIGN)
    if(decodedToken.username == username && decodedToken.role === "user"){
      next()
    } else{
      return res.status(401).json({error: "Unauthorized"})
    }
  } catch(error){
    console.error(error)
    return res.status(400).json({error: "Server error"})    
  }
}

module.exports = {
  adminMiddleware,
  userChecking
}