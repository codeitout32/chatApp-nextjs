import { createContext, useMemo } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../reduxHooks";
import { getChats } from "../actions/chats";
import { recieveMessage } from "../slices/chatSlice";



export type ISocketContext = {
    subscribeChats: (userId: any) => void;
    deleteChat: (userId: any) => void;
    addMember: (userId: any) => void; 
    leaveGroup: (userId: any) => void; 
    subscribeChatMessages: (userId: any) => void;
    unSubscribeChatMessages: (userId: any) => void;
    sendMessage: (chatId: any, message: any) => void;
  };

 export const SocketContext = createContext<ISocketContext>(null)

const SocketProvider = ({children}) => {

    const socket = io('http://localhost:3100/', {transports: ['websocket']});

    const dispatch = useAppDispatch()

    const subscribeChats = (userId) => {
        socket.emit('subscribe chats',userId) 
        socket.on('chat created', () => getChats(dispatch))
        socket.on('chat deleted', () => getChats(dispatch))
        socket.on('member added', () => getChats(dispatch))
        socket.on('member left', () => getChats(dispatch))
    }

    const createChat = (userId) => {
        socket.emit('create chat', userId)
    }
    const deleteChat = (userId) => {
        socket.emit('delete chat', userId)
    }
    const addMember = (userId) => {
        socket.emit('add member', userId)
    }
    const leaveGroup = (userId) => {
        socket.emit('leave group', userId)
    }

    const subscribeChatMessages = (chatId) => {
        socket.emit('subscribe chat messages', chatId)
        socket.on('receive message', (message) => 
        // receiveMessage({chatId,message}, dispatch)
        dispatch(recieveMessage({chatId, message}))
        )
    }
    const unSubscribeChatMessages = (chatId) => {
        // socket.emit('subscribe chat messages', chatId)
        socket.off('receive message')
        socket.emit('unsubscribe chat messages', chatId)
    }

    const sendMessage = (chatId, message) =>{
         socket.emit('send message', chatId, message)
    }

    return (
        <SocketContext.Provider value={useMemo(() => ({
            subscribeChats,
            createChat, deleteChat, addMember,leaveGroup, subscribeChatMessages,unSubscribeChatMessages,sendMessage
        }),[])}> 
        {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider