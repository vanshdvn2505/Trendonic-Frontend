import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setSearch } from '../features/search/searchSlice'
import {setProduct} from '../features/product/productSlice'
import axios from 'axios';
axios.defaults.withCredentials = true;

function Address() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const [address, setAddress] = useState([]);
    const navigate = useNavigate();

    const fetchAddress = async () => {
        try {
            const id = auth.email;
            const response = await axios.post('http://localhost:7000/user/fetchAddress', {id}, { withCredentials: true });
            setAddress(response.data.data.result)
        }
        catch(error){
            console.log("Error At Fetch Address " + error);
            alert(error.message)  
        }
    }

    const searchProduct = async (input) => {
        try {
            dispatch(setSearch(input))
            dispatch(setProduct(null))
            if(input == ""){
                navigate('/home');
                return;
            }
            const response = await axios.post('http://localhost:7000/product/search', {input}, { withCredentials: true });
            dispatch(setProduct(response.data.data.products))
            navigate('/search_results');
        }
        catch(error){
            console.log("Error At Search Product " + error);    
            alert("Something Went Wrong !!")
        }
    }

      const removeAddress = async (idx) => {
        try {
            const id = auth.email;
            const response = await axios.post('http://localhost:7000/user/removeAddress', {id, idx}, { withCredentials: true });
            alert(response.data.message)
            location.reload()
        }
        catch(error){
            console.log("Error At Remove Address" + error);    
            alert("Something Went Wrong !!")
        }
      }

    useEffect(() => {
        fetchAddress();
    }, [])

  return (
    <div className='h-[90vh] w-full mt-[10vh] flex flex-col justify-center items-center bg-white'>
        <div className='h-[7%] w-full flex justify-start items-center bg-[#232f3e]'>
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
        <div className='h-[20%] w-[90%] flex flex-col justify-evenly items-start'>
            <p className='text-xl'><Link to='/home' className='text-[#007185]'>Home</Link> &gt; 
            <Link to='/account_options' className='text-[#007185]'>Your Account</Link> &gt; Your Addresses</p>
            <p className='text-3xl'>Your Addresses</p>
        </div>
        <div className='h-[73%] w-[90%] flex justify-evenly items-center'>
            <Link to={(address.length < 2) ? '/add_address' : '/address'}>
                <div className='h-[39vh] w-[45vh] flex flex-col justify-center items-center border-dashed border-4 rounded-xl border-[#c7c7c7]'
                onClick={() => {
                    if(address.length >= 2){
                        alert("Maximum address count is 2");
                    }
                }}>
                    <p className='text-6xl text-[#dddddd] mb-2'><i className="fa-solid fa-plus"></i></p>
                    <p className='text-3xl text-[#565959]'>Add Address</p>
                </div>
            </Link>
            <div className='h-[60%] w-[70%] flex flex-wrap justify-evenly items-center'>
                {address.length > 0 && (
                    address.map((item, index) => (
                        <div key={index} className='h-full w-[45%] flex justify-center items-center rounded-xl border-2'>
                            <div className='h-[80%] w-full border-y-[1px]'>
                                <div className='h-[80%] w-full pl-5 flex flex-col justify-evenly items-start'>
                                    <p className='font-semibold'>{item.name}</p>
                                    <p>{item.flat}, {item.area}</p>
                                    <p>{item.city}, {item.state}</p>
                                    <p>Phone Number: {item.phone}</p>
                                </div>
                                <div className='h-[20%] w-full pl-5'
                                onClick={() => removeAddress(index)}>
                                    <button className='h-[80%] w-[20%] rounded-lg bg-[#ffa41c]'>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Address