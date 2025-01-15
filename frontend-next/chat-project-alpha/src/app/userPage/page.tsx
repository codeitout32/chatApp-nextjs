"use client"

import React from 'react'
import Sidebar from '../lib/components/Sidebar/Sidebar'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const router = useRouter()
  const {user, loading} = useAuth()

  if(loading) return <div>Loading...</div>
  if(user.userData)
  return (
    <div>
      <Sidebar/>
    </div>
  )
  else router.push('/')
}

export default UserPage