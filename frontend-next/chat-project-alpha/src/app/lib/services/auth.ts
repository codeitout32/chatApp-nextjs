// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type AuthResponse=  {
    data: any
}

// Define a service using a base URL and expected endpoints
export const authServiceApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100/', prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*')
  } }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<AuthResponse, string>({
      query: (name) => `users/${name}`,
    }),
    signInUser: builder.mutation<AuthResponse, any>({
        query: body => ({url: `users/signIn`,
     method: 'POST',
     body
    })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = authServiceApi