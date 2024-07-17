import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: null
  },
  reducers: {
    setAuth: (state, action) => {
        state.value = action.payload
    }
  }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer