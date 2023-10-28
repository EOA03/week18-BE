const bcrypt = require("bcrypt")
const generateToken = require('../utils/jwt-utils')

const allUsersAdmin = async (req, res)=>{
  try{
    const users = await req.db.collection("users").find().toArray()
    
    res.status(200).json({
      message: "Successfully get all users data",
      allUsers: users
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

const deleteUser = async (req, res)=>{
  const username = req.params.username
  try{
    const users = await req.db.collection("users").deleteOne({username})
    
    res.status(200).json({
      message: "Successfully delete a user"
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

const register = async (req, res)=>{
  const {email, username, password, role} = req.body
  
  try{
    const user = await req.db.collection("users").findOne({username})
    
    if(user){
      throw new Error("Username already exists")
    } 
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await req.db.collection("users").insertOne({email, username, password: hashedPassword, role})
    console.log(newUser);
    res.status(200).json({
      message: "User successfully registered",
    })
  } catch(error){
    res.status(400).json({error: error.message})
  }
}

const login = async (req, res)=>{
  const {username, password} = req.body
  const users = await req.db.collection("users").findOne({username})
  
  const isPasswordCorrect = await bcrypt.compare(password, users.password) 
  
  if(isPasswordCorrect){
    const token = generateToken(users.email, users.username, users.role)
    res.status(200).json({
      message: "User successfully logged in",
      accessToken: token
    })
  } else{
    res.status(400).json({error: "Username or password is incorrect"})
  }
}

module.exports = {
  allUsersAdmin,
  deleteUser,
  register,
  login
}