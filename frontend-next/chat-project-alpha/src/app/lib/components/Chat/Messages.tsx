import React from 'react'
import { useAppSelector } from '../../reduxHooks'
import { Box, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

const Messages = ({chat}) => {

    console.log('message component', chat);
    
    const user = useAppSelector(state => state.auth)
    
    const messageBoxes = chat.messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(message => {
        return (
            <Box key={uuidv4()} p={1}> 
                <Typography variant='caption'>
                    {message.sender.id == user.id? 'You': message.sender.name}
                </Typography>
                {message.text}
            </Box>
        )
    })
  return (
    <Box display={'flex'} flexDirection={'column-reverse'} flex={1}>
        {messageBoxes}
    </Box>
  )
}

export default Messages