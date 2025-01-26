'use client'
import React, { useContext, useEffect } from 'react'
import SocketProvider, { SocketContext } from '../context/Socket'
import useAuth from '@/app/hooks/useAuth'

import { useAppDispatch, useAppSelector } from '../reduxHooks'
import { getChats } from '../actions/chats'

const RootComponent = ({children}) => {
    const socket = useContext(SocketContext)
  const {user ,loading } = useAuth()
const dispatch = useAppDispatch()
  const chats = useAppSelector(state => state.chats)

  useEffect(() => {
    if(user.userData) {
      console.log('found user', user);
      
      if(user.userData?.role === 'user') {
      getChats(dispatch)
        socket.subscribeChats(user.userData.id)
        chats.map(chat => socket.subscribeChatMessages(chat.id))
      }
    }
  }, [user])
  return (
    children
  )
}

const RootComponentWrapper = (props) => {

    return (
        <SocketProvider>
            <RootComponent {...props} />
            </SocketProvider>
    )
}

export default RootComponentWrapper 