import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Add_Address() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const [details, setDetails] = useState({
        name: "",
        phone: "",
        flat: "",
        area: "",
        city: "",
        state: "",
    });
    const navigate = useNavigate();

    const searchProduct = async (input) => {
        try {
            dispatch(setSearch(input))
            dispatch(setProduct(null))
            if(input == ""){
                navigate('/home');
                return;
            }
            const response = await axios.post('http://localhost:7000/product/search', {input}, { withCredentials: true });
            console.log(response.data);
            dispatch(setProduct(response.data.data.products))
            navigate('/search_results');
        }
        catch(error){
            console.log("Error At Search Product " + error);    
            alert("Something Went Wrong !!")
        }
      }

    const handleChange = (event) => {
        const {name, value} = event.target;
            setDetails({
                ...details,
                [name]: value,
            })
    }

    const addAddress = async () => {
        try {
            const id = auth.email;
            const response = await axios.post("http://localhost:7000/user/addAddress", {id, details}, { withCredentials: true });
            console.log(response.data);
            alert(response.data.message)
            navigate('/address')
        }
        catch(error){
            console.log("Error At Add Address " + error);
            alert(error.message)    
        }        
    }

  return (
    <div className='h-[150vh] w-full mt-[10vh] flex flex-col justify-center items-center bg-white'>
        <div className='h-[5%] w-full flex justify-start items-center bg-[#232f3e]'>
            <button className='h-full w-[10%] ml-[2%] hover:border-[1px] hover:border-white text-white font-semibold'
            onClick={() => searchProduct("Trendonic")}>All Categories</button>
            <button className='h-full w-[10%] hover:border-[1px] hover:border-white text-white font-semibold'
            onClick={() => searchProduct("Furniture")}>Furniture</button>
            <button className='h-full w-[10%] hover:border-[1px] hover:border-white text-white font-semibold'
            onClick={() => searchProduct("Smartphones")}>Smartphones</button>
            <button className='h-full w-[10%] hover:border-[1px] hover:border-white text-white font-semibold'
            onClick={() => searchProduct("Shoes")}>Shoes</button>
            <button className='h-full w-[10%] hover:border-[1px] hover:border-white text-white font-semibold'
            onClick={() => searchProduct("Beauty")}>Beauty</button>
        </div>
        <div className='h-[15%] w-[60%] mt-2 flex flex-col justify-evenly items-start border-[1px] border-black rounded-xl'>
            <p className='text-xl ml-5'><Link to='/home' className='text-[#007185]'>Home</Link> &gt; <Link to='/account_options' className='text-[#007185]'>Your Account</Link> &gt; 
            <Link to='/address' className='text-[#007185]'>Your Addresses</Link> &gt; Add Addresses</p>
            <p className='text-3xl ml-5 font-bold'>Add Address</p>
        </div>
        <div className='h-[80%] w-[50%] ml-[10%] flex flex-col justify-evenly items-start'>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>Full Name</p>
                <input
                 type="text"
                 onChange = {handleChange}
                 value = {details.name}
                 name = "name"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>Mobile Number</p>
                <input
                 type="Number"
                 onChange = {handleChange}
                 value = {details.phone}
                 name = "phone"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>Flat, House, Building number</p>
                <input
                 type="text"
                 onChange = {handleChange}
                 value = {details.flat}
                 name = "flat"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>Area, Sector, Village</p>
                <input
                 type="text"
                 onChange = {handleChange}
                 value = {details.area}
                 name = "area"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>City</p>
                <input
                 type="text"
                 onChange = {handleChange}
                 value = {details.city}
                 name = "city"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <div className='h-[10%] w-[90%] flex flex-col justify-evenly items-start  flex-shrink-0'>
                <p className='font-semibold'>State</p>
                <input
                 type="text"
                 onChange = {handleChange}
                 value = {details.state}
                 name = "state"
                 className='h-[50%] w-[80%] pl-2 rounded-md border-[1px] border-black' 
                />
            </div>
            <button className='h-[5%] w-[20%] bg-[#ffd814] rounded-full'
            onClick={addAddress}>
                Add Address
            </button>
        </div>
    </div>
  )
}

export default Add_Address