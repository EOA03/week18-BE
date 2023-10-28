# BACKEND

## PROJECT DETAILS

There have 2 role here:
- User
- Admin

Both of the role still not regis yet, so you can make it by yourself.

Routes of this project:
- Auth route `/auth` :
  - GET `/admin` : for admin to get all users data
  - DELETE `/admin/:username` : for admin delete a user data
  - POST `/register` : for register a user
  - POST `/login` : for login

- Todo route `/todo` :
  - GET `/admin` : for admin to get all todo list
  - GET `/admin/:username` : for admin get all todo list by username
  - GET `/:username` : for user get all todo list by their username
  - POST `/:username` : for user to make a new todo list by their username
  - PUT `/:username/:todoId` : for user to edit a todo list by their username and todo id
  - DELETE `/:username/:todoId` : for user to delete a todo list by their username and todo id
  - DELETE `/:todoId` : for admin to delete a todo list

There are also have some routes about click-jacking.

I'm sorry, I run out off time, so I don't make the documentation API. That's all the endpoint of the project. Thankyou