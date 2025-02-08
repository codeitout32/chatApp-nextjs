import http from 'http'
import { Server } from 'socket.io'
import { CLIENT_URL } from './constants'
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");

const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
            // credentials: true
        },
        path: '/server/socket.io/'
    })

    io.adapter(createAdapter());

    setupWorker(io);

    io.on('connection', (socket) => {

        console.log('socket started', socket.id);
        
        socket.on('subscribe chats', (userId) => {
            socket.join(`'user${userId}`)
        })
        socket.on('create chat', (userId) => {
            socket.to(`'user${userId}`).emit('chat created')
        })
        socket.on('delete chat', (userId) => {
            socket.to(`'user${userId}`).emit('chat deleted')
        })
        socket.on('add member', (userId) => {
            socket.to(`'user${userId}`).emit('member added')
        })
        socket.on('leave group', (userId) => {
            socket.to(`'user${userId}`).emit('member left')
        })
        socket.on('subscribe chat messages', (chatId) => {
            console.log('socket subscribe message started', chatId);

            socket.join(chatId)
        })
        socket.on('unsubscribe chat messages', (chatId) => {
            console.log('socket unsubscribe message started', chatId);

            socket.leave(chatId)
        })
        socket.on('send message', (chatId, message) => {
            console.log('socket send message started', message);
            
            socket.to(chatId).emit('receive message', message)
        })

        socket.on("connection_error", (err) => {
            console.log(err.req);      // the request object
            console.log(err.code);     // the error code, for example 1
            console.log(err.message);  // the error message, for example "Session ID unknown"
            console.log(err.context);  // some additional error context
          });
    })


}

export default initializeSocket