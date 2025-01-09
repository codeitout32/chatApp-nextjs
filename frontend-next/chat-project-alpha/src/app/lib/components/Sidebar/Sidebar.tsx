import { Box } from '@mui/material'
import React from 'react'
import UserPanel from './UserPanel'

const Sidebar = () => {
  return (
    <Box 
    display={'flex'}
    flexDirection={'column'}
    width={'360px'}
    borderRight={1}
    borderColor={'divider'}
    >
        <UserPanel />
    </Box>
  )
}

export default Sidebar