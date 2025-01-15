
import * as api from '../api'
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
        // chat.members.map(member => payload.socket.createChat(member.id))
        dispatch(chatsSlice.actions.createPrivateChat(chats))
    } catch (error) {
        
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


