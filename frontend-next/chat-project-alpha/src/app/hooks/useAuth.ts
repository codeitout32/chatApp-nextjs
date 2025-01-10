
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks'
import { jwtDecode } from 'jwt-decode'
import { autoSignIn, signOut } from '../lib/slices/authSlice'
import * as api from '../lib/api'

const useAuth = () => {
 const user = useAppSelector(state => state.auth)
 const [loading, setLoading] = useState(false)
 const dispatch = useAppDispatch();

 useEffect(() => {
   const userData = JSON.parse(localStorage.getItem('userData') || '')
 
  if(userData) {
    const decodedToken = jwtDecode(userData.token)

    if((decodedToken?.exp || 0) * 1000 < new Date().getTime()) {
        dispatch(signOut())
        setLoading(false)
    } else validateUser(userData)
  } else {
    setLoading(false)
  }
 }, [])

 const validateUser = async (userData: any) => {
    try {
        
        const {data} = await api.validateUser(userData)

        if(data.isValid) {
            dispatch(autoSignIn())
        } else dispatch(signOut())
    } catch (error) {
        console.log('Provided Credentials are incorrect');
        
    }
    setTimeout(() => setLoading(false), 300)

 }

 return [user, loading]
 
}

export default useAuth