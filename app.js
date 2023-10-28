require("dotenv").config()

const express = require("express")
const cors = require("cors")
const dataMiddleware = require("./middleware/db")
const todoRouter = require("./routes/todo-route")
const authRoute = require("./routes/auth-route")
const preventRoute = require('./routes/preventAttackRouter')
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(dataMiddleware)

const Client = {
    origin: 'https://week-18-eoa03.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }

app.get("/", (req, res)=>{
    res.send("Todo Request Management API")
})

app.use("/auth", authRoute)
app.use("/todo", todoRouter)

app.get('/client-y', cors(ClientY), (req, res) => {
    res.json({ message: 'This is a CORS-enabled y-client route' });
});

app.post('/client-y', cors(ClientY), (req, res) => {
    let body = req.body;
    res.json({ message: body });
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})