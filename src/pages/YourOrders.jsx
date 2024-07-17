import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setSearch } from '../features/search/searchSlice'
import {setProduct} from '../features/product/productSlice'
import axios from 'axios';

function YourOrders() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const [curr, setCurr] = useState("Orders")
    const [orders, setOrders] = useState([]);
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
            dispatch(setProduct(response.data.data.products))
            navigate('/search_results');
        }
        catch(error){
            console.log("Error At Search Product " + error);    
            alert("Something Went Wrong !!")
        }
    }

    const fetchOrders = async () => {
        try {
            const id = auth.email;
            const response = await axios.post('http://localhost:7000/user/fetchOrders', {id}, {withCredentials: true});
            setOrders(response.data.data.orders);
        }
        catch(error){
            console.log("Error At Fetch Orders " + error);
            alert(error.message);   
        }
    }

    useEffect(() => {
        fetchOrders();
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
        <div className='h-[20%] w-[80%] flex flex-col justify-evenly items-start'>
            <p className='text-xl'><Link to='/home' className='text-[#007185]'>Home</Link> &gt; 
            <Link to='/account_options' className='text-[#007185]'>Your Account</Link> &gt; Your Orders</p>
            <p className='text-3xl'>Your Orders</p>
        </div>
        <div className='h-[73%] w-[80%] flex flex-col justify-center items-center'>
            <div className='h-[10%] w-[80%] border-b-[1px] border-black flex justify-start items-end'>
                <button className={`h-[90%] w-[20%] mr-2 ${curr == "Orders" ? 'text-black font-semibold border-b-2 border-[#e47911]' : 'text-[#007185]'}`}
                onClick={() => setCurr("Orders")}>
                    Orders
                </button>
                <button className={`h-[90%] w-[20%] mr-2 ${curr == "Completed" ? 'text-black font-semibold border-b-2 border-[#e47911]' : 'text-[#007185]'}`}
                onClick={() => setCurr("Completed")}>
                    Completed Orders
                </button>
            </div>
            <div className='h-[90%] w-[80%]'>
                {(curr == "Orders") ?
                        (orders.length > 0) ? 
                            <div className='h-full w-full overflow-y-auto scrollbar-hide'>
                                {orders.map((item, index) => (
                                    <div key={index} className='h-[85%] w-full flex flex-col justify-evenly items-center rounded-xl flex-shrink-0 my-5 bg-white border-[1px] border-black'>
                                        <div className='h-[40%] w-[95%] flex flex-wrap flex-col justify-evenly items-start rounded-lg bg-[#e3e6e6]'>
                                            <p className='ml-2'>Delivery Address:    <span className='font-semibold'>{item.address.name},&nbsp;&nbsp;</span>
                                                                    <span>{item.address.flat}&nbsp;</span>
                                                                    <span>{item.address.area},&nbsp;</span>
                                                                    <span>{item.address.city},&nbsp;</span>
                                                                    <span>{item.address.state}&nbsp;</span>
                                            </p>
                                            <p className='ml-2'>Phone Number: {item.address.phone}</p>
                                            <p className='ml-2'>({item.products.length} Items) Price: &#8377;{item.finalAmt}</p>
                                        </div>
                                        <div className='h-[55%] w-[95%] overflow-y-auto scrollbar-hide flex flex-col justify-evenly items-start rounded-lg bg-[#e3e6e6]'>
                                            <p className='ml-4 mt-3 text-xl font-semibold'>Products: </p>
                                            {item.products.map((prod, idx) => (
                                                <div key={idx} className='h-[40%] w-[90%] flex-shrink-0 rounded-lg ml-[5%] my-2 flex justify-evenly items-center bg-white border-[1px] border-black'>
                                                    <div className='h-[95%] w-[15%] rounded-lg bg-[#e3e6e6]'>
                                                        <img className='h-full w-full rounded-lg object-cover' src={prod.images[0]} alt="Loading..." />
                                                    </div>
                                                    <div className='h-[95%] w-[60%] flex justify-start items-center'>
                                                        <p>{prod.title.length > 40 ? prod.title.splice(0, 40) + "..." : prod.title}</p>
                                                    </div>
                                                    <div className='h-[95%] w-[20%] bg-[#e3e6e6] rounded-lg flex justify-center items-center'>
                                                        <p>&#8377;{(prod.price*83.48.toFixed(2) - ((prod.discountPercentage*prod.price*83.48.toFixed(2))/100)).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            : 
                            <div>

                            </div>  
                        
                : 
                        <div className='min-h-[62vh] h-auto w-full'>

                        </div> }
            </div>
        </div>
    </div>
  )
}

export default YourOrders