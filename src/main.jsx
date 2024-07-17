import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import  {store} from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'
import Layout from '../Layout'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Login from './pages/Signup'
import Account_Options from './pages/Account_Options'
import Layout1 from '../Layout1'
import Login_Security from './pages/Login_Security'
import Search_Results from './pages/Search_Results'
import Open_Product from './pages/Open_Product'
import Cart from './pages/Cart'
import Address from './pages/Address'
import Add_Address from './components/Add_Address'
import PlaceOrder from './pages/PlaceOrder'
import YourOrders from './pages/YourOrders'
const persistor = persistStore(store)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='/' element = {<Layout1 />}>
        <Route path='' element = {<Home />} />
        <Route path='/' element = {<Home />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/account_options' element = {<Account_Options />} />
        <Route path='/login_security' element = {<Login_Security />} />
        <Route path='/address' element = {<Address />} />
        <Route path='/add_address' element= {<Add_Address/>} />
        <Route path='/search_results' element = {<Search_Results />} />
        <Route path='/open_product/:id' element = {<Open_Product />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/placeOrder' element = {<PlaceOrder />} />
        <Route path='/yourOrders' element = {<YourOrders />} />
      </Route>  
      <Route path='/signup' element = {<Login />} />
      <Route path='/signin' element = {<Signin />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router = {router} />
      </PersistGate>
    </Provider>
)
