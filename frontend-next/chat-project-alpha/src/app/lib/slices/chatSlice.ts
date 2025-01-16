import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export type ChatState = any[]

// Define the initial state using that type
const initialState: ChatState = []

export const chatsSlice = createSlice({
  name: 'chats',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createPrivateChat: (chats, action: PayloadAction<any>) => {
      
     chats = [...chats, action.payload]
    },
   
    fetchChats : (chats, action: PayloadAction<any>) => {
      // console.log('chat slice', action.payload);
      
      chats = [...action.payload]

      return chats
    },

    sendMesage: (chats, action: PayloadAction<any>) => {
      chats = chats.map(chat => {
        if(chat.id === action.payload.chatId ) {
          chat.messages.push(action.payload.message)
          chat.recentMessage = action.payload.message
        }
        return chat
      })
    },

    recieveMessage: (chats, action: PayloadAction<any>) => {
      chats = chats.map(chat => {
        if(chat.id === action.payload.chatId ) {
          chat.messages.push(action.payload.message)
          chat.recentMessage = action.payload.message
        }
        return chat
      })
       
    }
   
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const {   createPrivateChat,recieveMessage } = chatsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChats = (state: RootState) => state.chats

export default chatsSlice.reducer