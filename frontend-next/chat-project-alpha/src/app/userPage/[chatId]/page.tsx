import Chat from '@/app/lib/components/Chat/Chat'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import { Box } from '@mui/material'
import React from 'react'

const Page = async ({params}) => {

    const chatId = (await params).chatId
  return (
    <Box display={'flex'} height={'100vh'}>
    <Sidebar />
    <Chat />
    {chatId}
    </Box>
  )
}

export default Page