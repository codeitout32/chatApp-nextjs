"use client"
import { Avatar, Box, Button, Container,  TextField,  Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { increment } from '../lib/slices/counterSlice';
import { authServiceApi } from '../lib/services/auth';

const LoginPage = () => {

    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useAppDispatch()
 const [startSignIn, result] = authServiceApi.useSignInUserMutation()

    const toggleIsSignUp = () => setIsSignUp(!isSignUp)
    const count = useAppSelector(state => state.counter.value)
    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        dispatch(increment())
        if(isSignUp) {

        }else {
            const email = data.get('email')
            const password = data.get('password')
            // if (!action.payload.token) return null
            // localStorage.setItem('userData', JSON.stringify(action.payload))
            console.log('em pass', email, password)
            startSignIn({email, password})
        }
    }

    console.log('results', result);
    
  return (
    <Container component={'main'} maxWidth="xs">

    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // color: 'white'
    }}>
        <Avatar sx={{m: 1, bgColor: 'secondary.main'}}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant='h5'>
            {isSignUp? 'Sign up': 'Sign in'}
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit} sx={{mt:3}}>
            <Grid container spacing={2}>
                {isSignUp? (
                    <>
                    <Grid size={{xs: 12, sm: 6}}>
                         <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                        </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                         <TextField
                    autoComplete="given-name"
                    name="lastName"
                    required
                    fullWidth
                    id="firstName"
                    label="Last Name"
                    autoFocus
                    // color='custom'
                  />
                        </Grid>
                        
                        </>
                ): ''} 
                <Grid size={{xs: 12}}>
                         <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                  />
                        </Grid>
                        <Grid size={{xs: 12}}>
                         <TextField
                    autoComplete="new-password"
                    name="password"
                    required
                    fullWidth
                    type='password'
                    id="password"
                    label="Password"
                    autoFocus
                  />
                        </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
Count: {count}
            
        </Box>
    </Box>
   </Container>
  )
}

export default LoginPage