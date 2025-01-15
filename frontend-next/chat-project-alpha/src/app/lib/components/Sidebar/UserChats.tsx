import React from 'react'
import { useAppSelector } from '../../reduxHooks'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@mui/material'

const UserChats = () => {
    const user = useAppSelector(state => state.auth)
    const chats = useAppSelector(state => state.chats)
    const {chatId} = useParams()

    const chatBoxes = chats.map((chat) => {
        const otherUser = getOtherMember(chat.members, user.id)

        return (
            <Link to={`/${chat.id}`} key={chat.id} style={{textDecoration: 'none'}}>
                <Button fullWidth></Button>
                
                </Link>
        )
    })
  return (
    <div>UserChats</div>
  )
}

export default UserChats