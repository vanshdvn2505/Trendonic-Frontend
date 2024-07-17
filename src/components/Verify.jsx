import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from '../features/auth/authSlice'
import axios from 'axios'

function Verify() {

    const [otp, setOTP] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const navigate = useNavigate();

    const verify = async () => {
        try {
            const response = await axios.post('http://localhost:7000/auth/verifyOtp', {otp, auth}, { withCredentials: true })
            console.log(response.data);
            navigate('/home')
        }
        catch(error){
            dispatch(setAuth(null));
            console.log("Error At OTP " + error);
            alert("Failed To Verify OTP");    
            navigate('/signup')
        }
    }

    return (
        <div className='h-[70vh] w-full flex justify-center items-center'>
            <div className='h-[90%] w-[30%] rounded-lg border-[1px] border-[#bbbfbf]'>
                <div className='h-[15%] w-full rounded-t-lg flex justify-start items-center border-b-[1px] border-[#bbbfbf] pl-[10%] text-2xl'>
                    <p>Verify Email</p>
                </div>
                <div className='h-[75%] w-full pl-[10%] flex flex-col justify-evenly items-start border-b-[1px] border-[#bbbfbf]'>
                    <div className='h-[25%] w-[90%]'>
                        <p className='font-semibold'>An OTP has been sent on {auth.email == null ? "" : auth.email}</p>
                    </div>
                    <div className='h-[25%] w-[90%] '>
                        <p className='font-semibold'>Enter OTP</p>
                        <input type="number"
                            className='h-[40%] w-[100%] rounded-sm border-[1px] pl-3 border-[#888c8c]'
                            name='otp'
                            required
                            onChange={(e) => setOTP(e.target.value)}
                        />
                    </div>
                    <button className='h-[15%] w-[90%] rounded-md bg-[#ffd814]'
                        onClick={verify}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Verify