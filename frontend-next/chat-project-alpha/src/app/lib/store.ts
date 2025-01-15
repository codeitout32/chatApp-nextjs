import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import authSlice from './slices/authSlice'
import { authServiceApi } from './services/auth'
import { setupListeners } from '@reduxjs/toolkit/query'
import chatSlice from './slices/chatSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
        chats: chatSlice,
        [authServiceApi.reducerPath]: authServiceApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authServiceApi.middleware),
  })
}

setupListeners(makeStore().dispatch)
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']