import { createContext, useMemo } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
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

  

    const socket = io(process.env.NEXT_PUBLIC_API_URL, {transports: ['websocket']});

    socket.on("connect", () => {
      console.log('socket connected', socket.connected, socket.id); // true
    });

    socket.on("connect_error", (err: any) => {
        console.log('connect error');
        
      // the reason of the error, for example "xhr poll error"
      console.log(err.message);

      // some additional description, for example the status code of the initial HTTP response
      console.log(err.description);

      // some additional context, for example the XMLHttpRequest object
      console.log(err.context);
    });

    const dispatch = useAppDispatch()

    const subscribeChats = (userId) => {
        socket.emit('subscribe chats',userId) 
        socket.on('chat created', () => getChats(dispatch))
        socket.on('chat deleted', () => getChats(dispatch))
        socket.on('member added', () => getChats(dispatch))
        socket.on('member left', () => getChats(dispatch))
        socket.on("connect_error", (err: any) => {
            // the reason of the error, for example "xhr poll error"
            console.log(err.message);
          
            // some additional description, for example the status code of the initial HTTP response
            console.log(err.description);
          
            // some additional context, for example the XMLHttpRequest object
            console.log(err.context);
          });
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
        // debugger;
        console.log('socket subscribe chat messages', chatId)

        socket.emit('subscribe chat messages', chatId)
        socket.on('receive message', (message) => 
        // receiveMessage({chatId,message}, dispatch)
        {console.log('socket on receive', chatId, message);
        
            dispatch(recieveMessage({chatId, message}))}
        )
    }
    const unSubscribeChatMessages = (chatId) => {
        console.log('socket unsubscribe chat messages', chatId)
        socket.off('receive message')
        socket.emit('unsubscribe chat messages', chatId)
    }

    const sendMessage = (chatId, message) =>{
        console.log('socket emitting message', chatId,message)
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