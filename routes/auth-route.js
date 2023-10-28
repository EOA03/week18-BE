const {Router} = require("express")
const {allUsersAdmin, deleteUser, register, login} = require("../controller/auth-control")
const {adminMiddleware} = require('../middleware/auth-middleware')

const authRoute = Router()

authRoute.get("/admin", adminMiddleware, allUsersAdmin)
authRoute.delete("/admin/:username", adminMiddleware, deleteUser)
authRoute.post("/register", register)
authRoute.post("/login", login)

module.exports = authRoute