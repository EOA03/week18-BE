require("dotenv").config()

const express = require("express")
const cors = require("cors")
const dataMiddleware = require("./middleware/db")
const todoRouter = require("./routes/todo-route")
const authRoute = require("./routes/auth-route")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(dataMiddleware)

app.get("/", (req, res)=>{
    res.send("Transfer Request Management API")
})

app.use("/auth", authRoute)
app.use("/todo", todoRouter)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})