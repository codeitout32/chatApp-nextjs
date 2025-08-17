const { handler } = require('@netlify/functions');
import { AppDataSource } from "../../src/data-source"
import { User } from "../../src/entity/User"

import usersRouter from '../../src/routes/users'
import chatsRouter from '../../src/routes/chats'
import errorHandler from "../../src/middleware/errorHandler"
import { Server } from "socket.io"
import initializeSocket from "../../src/config/socket"

const express = require('express')
const http = require('http')
var cors = require('cors')
const app = express()
const httpServer = http.createServer(app)
// const io = new Server(httpServer,{})
const port = 3100

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/chats', chatsRouter)

app.get('/', async (req, res) => {
    // res.send('Hello World!')
    // const users = await AppDataSource.manager.find(User)
    const users = ['userstest']
    res.send('users' + users.map(o => JSON.stringify(o)).join('<br>'))
  })

  httpServer.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
  })

app.use(errorHandler)

initializeSocket(httpServer)

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.email = 'test@gmail.com' + (Math.random() * 1000).toFixed()
    user.password = 'soempass'
    // user.age = 25
    // await user.save()
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await User.find()
    // console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

exports.handler = handler(app);