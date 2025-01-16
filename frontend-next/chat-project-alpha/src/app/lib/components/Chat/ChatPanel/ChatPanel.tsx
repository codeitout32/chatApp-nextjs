'use client'
import { useAppSelector } from '@/app/lib/reduxHooks'
import { getInitials, getOtherMember } from '@/app/utils/functions'
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import PrivateMenu from './PrivateMenu'
import GroupMenu from './GroupMenu'

const ChatPanel = ({chat}) => {

    const user = useAppSelector(state => state.auth.userData)
    const otherUser = getOtherMember(chat?.members, user?.id)
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={2} borderBottom={1} borderColor={'divider'}>
<Box display={'flex'} alignItems={'center'} >

            <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${getInitials( chat.type === 'private' ? otherUser.name : chat.name)}`} />
            <Typography variant="h6" ml={1}>
                {chat?.type == "private" ? otherUser.name : chat.name}
              </Typography>
</Box>
{chat.type === 'private' ? (
    <PrivateMenu otherUser={otherUser} chat={chat} />
): (
    <GroupMenu chat={chat} />
)}
    </Box>
  )
}

export default ChatPanel