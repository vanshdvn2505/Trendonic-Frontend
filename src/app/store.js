import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'
import productReducer from '../features/product/productSlice'
import openProdReducer from '../features/openProd/openProdSlice'
import cartReducer from '../features/cart/cartSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    product: productReducer,
    openProd: openProdReducer,
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})