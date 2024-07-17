import React, { useState, useEffect } from 'react'
import Logo from '../assets/Logo-Black-Yellow.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setAuth} from '../features/auth/authSlice'
import axios from 'axios'
import Register from '../components/Register'
import Verify from '../components/Verify'

function Signup() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const navigate = useNavigate();


  return (
    <div className='h-[100vh] w-full flex flex-col'>
        <div className='h-[15%] w-[full] flex justify-center items-center border-b-2 border-[#bbbfbf]'>
            <img src={Logo} className='bg-cover h-[45%] w-auto' />
        </div>
        {auth == null ? <Register /> : <Verify />}
        
        
    </div> 
  )
}

export default Signup