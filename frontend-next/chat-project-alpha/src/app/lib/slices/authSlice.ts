import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface CounterState {
  userData: any
}

// Define the initial state using that type
const initialState: CounterState = {
  userData: null
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<any>) => {
      localStorage.setItem('userData', action.payload)
      state.userData = action.payload
    },
    decrement: state => {
      state.userData -= 1
    },
    signOut: state => {
      state.userData = null
      localStorage.clear()
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const {  decrement, signIn } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.userData

export default authSlice.reducer