
import * as api from '../api'
import { ISocketContext } from '../context/Socket';
    import { chatsSlice } from '../slices/chatSlice';

export const createPrivateChat = async (payload: {email: string; socket: any}, dispatch: any) => {
    try {
        const { data: chat} = await api.createPrivateChat(payload.email)
        chat.members.map(member => payload.socket.createChat(member.id))
        dispatch(chatsSlice.actions.createPrivateChat(chat))
    } catch (error) {
        
    }
} 
export const getChats = async (dispatch: any) => {
    try {
        const { data: chats} = await api.getChats()
        console.log('getchats actions', chats)
        // chat.members.map(member => payload.socket.createChat(member.id))
        dispatch(chatsSlice.actions.fetchChats(chats))
    } catch (error) {
        
    }
} 

export const sendMessage =async (dispatch:any, payload: {message: string, socket: ISocketContext, chatId: string}) => {
    try {
        const { data: text} = await api.createMessage(payload.chatId, payload.message)
        // console.log('getchats actions', chats)
        payload.socket.sendMessage(payload.chatId, text)
        // chat.members.map(member => payload.socket.createChat(member.id))
        dispatch(chatsSlice.actions.sendMesage({message: text, chatId: payload.chatId}))
    } catch (error) {
        console.log('chat action error', error);
        
    }
}
// export const receiveMessage = async (payload: {chatId: string, message: string} ,dispatch: any) => {
//     try {
//         // const { data: chats} = await api.receiveMessage()
//         // chat.members.map(member => payload.socket.createChat(member.id))
//         dispatch(chatsSlice.actions.createPrivateChat(chats))
//     } catch (error) {
        
//     }
// } 


