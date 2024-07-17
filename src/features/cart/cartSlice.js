import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    selected: [],
  },
  reducers: {
    addItem: (state, action) => {
        state.selected.push(action.payload)
    },
    removeItem: (state, action) => {
        state.selected =  state.selected.filter(item => item._id != action.payload._id)
    },
    clearCart: (state) => {
      state.selected = [];
    }
  }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions

export default cartSlice.reducer