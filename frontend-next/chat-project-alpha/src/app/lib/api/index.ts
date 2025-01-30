import axios from "axios";
import {jwtDecode } from 'jwt-decode'

console.log('API_URL',process.env, process.env.NEXT_PUBLIC_API_URL, process.env.NEXT_PUBLIC_PORT );


const API = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/'})

API.interceptors.request.use((req) => {
    const userData = localStorage.getItem('userData' )

    console.log('axios req', req);
    

    if(userData) {
        const userToken = userData
        req.headers.Authorization = 'Bearer ' + userToken

        const decodedToken = jwtDecode(userToken)
    }
    return req
})

export const signIn = (userData: any) => API.post('users/signIn', userData)
export const getCurrentUser = (userToken?: any) =>{ if(userToken) return API.post('/users/getCurrentUser',null,{headers: {
    Authorization: 'Bearer ' + userToken
}})
else return  API.post('users/getCurrentUser')
}
export const validateUser = (userData: any) => API.post('/users/validateUser', userData)

export const createPrivateChat = (email: string) => API.post('/chats/private',{email})

// Chats
export const getChats = () => API.get('/chats')
// export const receiveMessage = () => API.get('/chats')

export const createMessage = (chatId: string, text: string) => API.post(`/chats/${chatId}`, {text})

