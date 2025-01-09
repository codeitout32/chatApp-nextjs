"use client"
import { getInitials } from '@/app/utils/functions'
import { Avatar, Box } from '@mui/material'
import React from 'react'
import { authServiceApi } from '../../services/auth'

const UserPanel = () => {

  const [signIn, result] = authServiceApi.useSignInUserMutation()

  console.log('result up', result);
  

  return (
    <Box 
    display={'flex'}
    justifyContent={'space-between'}
    p={2}
    borderBottom={1}
    borderColor={'divider'} 
    >
        <Box>
            <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${getInitials('asha bhosle')}`} />
        </Box>
    </Box>             
  )
}

export default UserPanel