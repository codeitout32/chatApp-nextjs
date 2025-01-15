'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks'
import { jwtDecode } from 'jwt-decode'
import { autoSignIn, signOut } from '../lib/slices/authSlice'
import * as api from '../lib/api'

const useAuth = () => {
 const user = useAppSelector(state => state.auth)
 const [loading, setLoading] = useState(true)
 const dispatch = useAppDispatch();

 useEffect(() => {
   const userToken =localStorage.getItem('userData')
  debugger;
  if(userToken) {
    const decodedToken = jwtDecode(userToken)

    if((decodedToken?.exp || 0) * 1000 < new Date().getTime()) {
        dispatch(signOut())
        setLoading(false)
    } else validateUser(userToken)
  } else {
    setLoading(false)
  }
 }, [])

 const validateUser = async (userData: any) => {
    try {
        
        const {data} = await api.validateUser(userData)

        if(data.isValid) {
          const userData = await api.getCurrentUser()
            dispatch(autoSignIn(userData.data))
        } else dispatch(signOut())
    } catch (error) {
        console.log('Provided Credentials are incorrect', error);
        
    }
    setTimeout(() => setLoading(false), 300)

 }

 return {user, loading}
 
}

export default useAuth