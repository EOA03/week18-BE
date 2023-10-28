const { ObjectId } = require("mongodb")

const allTodosAdmin = async (req, res)=>{
    try{
      const todos = await req.db.collection("todos").find().toArray()
      
      res.status(200).json({
        message: "Success get all todo list",
        datas: todos
      })
    } catch(error){
      res.status(500).json({error: error.message})
    }
}

const allTodosUser = async (req, res)=>{
  try{
    const username = req.params.username
    const todos = await req.db.collection("todos").find({username}).toArray()
    
    res.status(200).json({
      message: "Success get all todo list",
      datas: todos
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}
  
const createTodos = async (req, res)=>{
  const username = req.params.username
  const {title, description, status} = req.body
    
  try{
    const newTodo = await req.db.collection("todos").insertOne({
      username,
      title,
      description,
      status
    })
      
    res.status(200).json({
      message: "Successfully created a todo list"
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
  return {title, description, status}
}

const updateTodos = async (req, res)=>{
  const username = req.params.username
  const todoId = new ObjectId(req.params.todoId)
  const {title, description, status} = req.body

  console.log(todoId);

  try{
    const data = await req.db.collection("todos").find({todoId})
    if(Object.keys(data) === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }

    const newStatus = await req.db.collection("todos").updateOne({
      _id: todoId,
      username: username
    }, {
      $set: {title, description, status}
    })

    res.status(200).json({
      message: "Success update a todo list"
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

const deleteTodosUser = async (req, res)=>{
  const username = req.params.username
  const todoId = new ObjectId(req.params.todoId)
  try{
    const data = await req.db.collection("todos").find({todoId}).toArray()
    if(Object.keys(data) === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }

    const newData = await req.db.collection("todos").deleteOne({_id: todoId})
    
    res.status(200).json({
      message: "Success delete a todo list"
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

const deleteTodosAdmin = async (req, res)=>{
  const todoId = new ObjectId(req.params.todoId)
  try{
    const data = await req.db.collection("todos").find({todoId}).toArray
    if(Object.keys(data) === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }

    const newData = await req.db.collection("todos").deleteOne({_id: todoId})
    
    res.status(200).json({
      message: "Success delete a todo list"
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}
  
module.exports = {
  allTodosAdmin,
  allTodosUser,
  createTodos,
  updateTodos,
  deleteTodosUser,
  deleteTodosAdmin
}