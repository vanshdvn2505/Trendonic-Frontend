import { createSlice } from '@reduxjs/toolkit'

export const openProdSlice = createSlice({
  name: 'openProd',
  initialState: {
    value: "",
  },
  reducers: {
    setOpenProd: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {setOpenProd} = openProdSlice.actions

export default openProdSlice.reducer