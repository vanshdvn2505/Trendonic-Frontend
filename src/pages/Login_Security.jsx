import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAuth } from '../features/auth/authSlice'


function Login_Security() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const [verified, setVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState(auth.username);
    const [email, setEmail] = useState(auth.email);
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [phone, setPhone] = useState(auth.phone);
    const [once, setOnce] = useState(false);
    const navigate = useNavigate();

    const saveChanges = async () => {
        try {
            const response = await axios.post('http://localhost:7000/user/saveChanges', {username, email, phone, currPass, newPass, auth}, { withCredentials: true });
            console.log(response.data);
            dispatch(setAuth(response.data.data));
            console.log(auth);
            alert("Changes Saved Successfully!");
            navigate('/home')
        }
        catch(error){
            console.log("Error At SaveChanges " + error);
            alert("Something Went Wrong !!")    
        }
    }

    const verifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:7000/user/verifyCode', {auth, otp}, { withCredentials: true });
            console.log(response.data);
            setVerified(true);
        }
        catch(error){
            console.log("Error At VerifyCode " + error);
            alert("Something wentwrong !!")  
        }
    }

    useEffect(() => {
        const sendEmail = async () => {
            try {
                const response = await axios.post('http://localhost:7000/user/sendEmail', {auth}, { withCredentials: true });
                console.log(response.data);
            }
            catch(error){
                console.log("Error At SendEmail " + error);
                alert("Something Went Wrong !!");
            }
        }
        if(!once){
            sendEmail();
            setOnce(true);
        }
    }, [auth, once])

  return (
    <div className='h-[100vh] w-full flex justify-evenly items-center'>
        <div className='h-full w-[60%] mt-[20vh]'>
            <div className='h-[15%] w-full mt-[2%] border-[1px] border-[#d5d9d9] rounded-lg flex flex-col justify-center items-start'>
                <span className='pl-[2%]'><Link to="/account_options">Your Account</Link> &gt; Login & Security</span>
                <p className='text-3xl pl-[2%]'>Login & Security</p>
            </div>
            <div className='h-[80%] w-full flex justify-center items-center'>
                {!verified && (
                    <div className='h-[60%] w-[50%] rounded-lg  flex flex-col justify-center items-center border-[1px] border-[#d5d9d9]'>
                        <div className='h-[50%] w-full rounded-t-lg pl-[5%] flex flex-col justify-evenly items-start'>
                            <p className='font-bold'>Enter Verification Code</p>
                            <p>For your security, we have sent the code to {auth.email}</p>
                        </div>
                        <div className='h-[50%] w-full rounded-b-lg pl-[5%] flex flex-col justify-evenly items-start'>
                            <input type="number"
                                className='h-[20%] w-[95%] pl-[2%] rounded-sm border-[1px] border-black'
                                value={otp}
                                placeholder='Enter OTP'
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className='h-[20%] w-[95%] rounded-lg bg-[#ffd814]'
                            onClick={verifyCode}>
                                Submit Code
                            </button>
                        </div>
                    </div>
                )}
                {verified && (
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className='h-[95%] w-[70%] border-[1px] border-[#d5d9d9] rounded-lg flex flex-col justify-evenly items-center'>
                            <div className='h-[15%] w-[90%] flex flex-col justify-evenly items-start'>
                                <p className='font-bold'>Username</p>
                                <input type="text"
                                value={username}
                                className='h-[50%] w-full outline-none pl-[1%] rounded-md border-[1px] border-[#d5d9d9]'
                                placeholder='Enter Username'
                                onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className='h-[15%] w-[90%] flex flex-col justify-evenly items-start'>
                                <p className='font-bold'>Email</p>
                                <input type="email"
                                value={email}
                                className='h-[50%] w-full outline-none pl-[1%] rounded-md border-[1px] border-[#d5d9d9]'
                                placeholder='Enter Email'
                                onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='h-[15%] w-[90%] flex flex-col justify-evenly items-start'>
                                <p className='font-bold'>Phone Number</p>
                                <input type="number"
                                value={phone}
                                className='h-[50%] w-full outline-none pl-[1%] rounded-md border-[1px] border-[#d5d9d9]'
                                placeholder='Enter Phone Number'
                                onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className='h-[25%] w-[90%] flex flex-col justify-evenly items-start'>
                                <p className='font-bold'>Password</p>
                                <input type="password"
                                value={currPass}
                                className='h-[30%] w-full outline-none pl-[1%] rounded-md border-[1px] border-[#d5d9d9]'
                                placeholder='Enter Current Password'
                                onChange={(e) => setCurrPass(e.target.value)}/>
                                <input type="password"
                                value={newPass}
                                className='h-[30%] w-full outline-none pl-[1%] rounded-md border-[1px] border-[#d5d9d9]'
                                placeholder='Enter New Password'
                                onChange={(e) => setNewPass(e.target.value)}/>
                            </div>
                            <div className='h-[20%] w-[90%] flex justify-evenly items-center'>
                                <button className='h-[40%] w-[40%] rounded-lg text-white bg-red-500'>
                                    Delete Account
                                </button>
                                <button className='h-[40%] w-[40%] rounded-lg bg-[#ffd814]'
                                onClick={saveChanges}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Login_Security