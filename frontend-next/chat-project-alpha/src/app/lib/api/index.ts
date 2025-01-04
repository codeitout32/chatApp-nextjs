import axios from "axios";
import {jwtDecode } from 'jwt-decode'

const API = axios.create({baseURL: 'http://localhost:3100/'})

API.interceptors.request.use((req) => {
    const userData = localStorage.getItem('userData' )

    if(userData) {
        const userToken = JSON.parse(userData)
        req.headers.Authorization = 'Bearer ' + userToken

        const decodedToken = jwtDecode(userToken)
    }
    return req
})

export const signIn = (userData: any) => API.post('users/signIn', userData)