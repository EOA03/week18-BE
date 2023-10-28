const {Router} = require("express")
const {allTodosAdmin, allTodosUser, createTodos, updateTodos, deleteTodosUser, deleteTodosAdmin} = require("../controller/todo-control")
const {adminMiddleware, userChecking} = require("../middleware/auth-middleware.js")

const todoRouter = Router()

todoRouter.get("/admin", adminMiddleware, allTodosAdmin)
todoRouter.get("/admin/:username", adminMiddleware, allTodosUser)
todoRouter.get("/:username", userChecking, allTodosUser)
todoRouter.post("/:username", userChecking, createTodos)
todoRouter.put("/:username/:todoId", userChecking, updateTodos)
todoRouter.delete("/:username/:todoId", userChecking, deleteTodosUser)
todoRouter.delete("/:todoId", adminMiddleware, deleteTodosAdmin)

module.exports = todoRouter