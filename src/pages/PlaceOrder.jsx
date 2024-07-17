import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addItem, removeItem } from '../features/cart/cartSlice';
import { setOpenProd } from '../features/openProd/openProdSlice'
import { setSearch } from '../features/search/searchSlice'
import {clearCart} from '../features/cart/cartSlice'
import { setProduct } from '../features/product/productSlice'
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.value)
  const selected = useSelector(state => state.cart.selected)
  const [address, setAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [payMethod, setPayMethod] = useState(null);
  const navigate = useNavigate()

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
      if (input == "") {
        navigate('/home');
        return;
      }
      const response = await axios.post('http://localhost:7000/product/search', { input }, { withCredentials: true });
      console.log(response.data);
      dispatch(setProduct(response.data.data.products))
      navigate('/search_results');
    }
    catch (error) {
      console.log("Error At Search Product " + error);
      alert("Something Went Wrong !!")
    }
  }

  const calculateTotalPrice = () => {
    return (selected.reduce((total, item) => total + (item.price*83.48.toFixed(2)), 0)).toFixed(2);
  };

  const calculateTotalDiscount = () => {
    return ((selected.reduce((total, item) => total + ((item.discountPercentage*item.price*83.48.toFixed(2))/100), 0))).toFixed(2);
  };

  useEffect(() => {
    fetchAddress();
  }, [])

  const handleOrder = async () => {
    try {
      const response = await axios.post('http://localhost:7000/user/placeOrder', {auth, selected, payMethod, selectedAddress}, {withCredentials: true})
      alert(response.data.message);
      dispatch(clearCart());
      navigate('/home')
    }
    catch(error){
      console.log("Error At Place Order " + error);
      alert(error.message)
    }
  }

  return (
    <div className='h-[90vh] w-full mt-[10vh] flex flex-col justify-center items-center'>
      <div className='h-[8%] w-full flex justify-start items-center bg-[#232f3e]'>
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
      <div className='h-[92%] w-full flex justify-evenly items-center'>
        <div className='h-[95%] w-[70%] rounded-xl border-[1px] border-black overflow-y-auto scrollbar-hide flex flex-col justify-evenly items-center bg-white'>
          <div className='h-[50%] w-[90%] flex-shrink-0 my-3 flex flex-col justify-evenly items-start rounded-xl bg-[#e3e6e6]'>
              <p className=' text-2xl font-semibold ml-5 mt-4'>Select Address</p>
              <ul className='h-[90%] w-full flex flex-col justify-evenly'>
              {address.length > 0 && (
                address.map((i, index) => (
                  <li key={index} className='h-[30%] w-[80%] ml-[3%] rounded-xl flex justify-start items-center bg-white'>
                    <label>
                      <input 
                        type="radio"
                        checked = {selectedAddress == index}
                        value = {index}
                        onChange={(e) => {setSelectedAddress(e.target.value)}}
                        className='ml-2 mr-3'
                      />
                      <span className='font-semibold'>{i.name}&nbsp;&nbsp;</span>
                      <span>{i.flat}&nbsp;</span>
                      <span>{i.area},&nbsp;</span>
                      <span>{i.city},&nbsp;</span>
                      <span>{i.state}&nbsp;</span>
                    </label>
                  </li>
                ))
              )}
              </ul>
          </div>
          <div className='h-[60%] w-[90%] my-3 flex-shrink-0 flex flex-col justify-evenly items-start rounded-xl bg-[#e3e6e6]'>
            <p className=' text-2xl font-semibold ml-5 mt-4'>Select Payment Option</p>
            <ul className='h-[90%] w-full flex flex-col justify-evenly'>
                  <li className='h-[25%] w-[80%] ml-[3%] rounded-xl flex justify-start items-center bg-white'>
                    <label>
                      <input 
                        type="radio"
                        checked = {payMethod == "Trendonic Wallet"}
                        value = "Trendonic Wallet"
                        onChange={(e) => {setPayMethod(e.target.value)}}
                        className='ml-2 mr-3'
                      />
                      Trendonic Wallet
                    </label>
                  </li>
                  <li className='h-[25%] w-[80%] ml-[3%] relative rounded-xl flex justify-start items-center bg-white'>
                    <label>
                      <input 
                        type="radio"
                        checked = {payMethod == "UPI"}
                        value = "UPI"
                        onChange={(e) => {setPayMethod(e.target.value)}}
                        className='ml-2 mr-3'
                      />
                      UPI Apps
                      <input 
                      type="text"
                      placeholder='Enter UPI ID'
                      className='h-[50%] w-[30%] bg-[#e3e6e6] rounded-xl pl-3 absolute right-2'
                      />
                    </label>
                  </li>
                  <li className='h-[25%] w-[80%] ml-[3%] rounded-xl flex justify-start items-center bg-white'>
                    <label>
                      <input 
                        type="radio"
                        checked = {payMethod == "COD"}
                        value = "COD"
                        onChange={(e) => {setPayMethod(e.target.value)}}
                        className='ml-2 mr-3'
                      />
                      Cash On Delievery
                    </label>
                  </li>
              </ul>
          </div>
          <div className='h-[60%] w-[90%] my-3 flex-shrink-0 flex flex-col justify-evenly items-center rounded-xl bg-[#e3e6e6]'>
              <p className=' text-2xl font-semibold mt-4 mr-[85%]'>Items</p>
              <div className='h-[90%] w-[80%] flex flex-col justify-evenly items-center overflow-y-auto'>
                <ul className='h-full w-full flex flex-col justify-evenly items-center'>
                  {selected.map((item, index) => (
                    <li key={index} className='h-[30%] w-full my-2 flex-shrink-0 flex justify-evenly items-center rounded-xl bg-white'>
                        <div className='h-[90%] w-[15%] bg-[#e3e6e6] rounded-lg'>
                            <img className='h-full w-full object-cover' src={item.images[0]} alt="Loading..." />
                        </div>
                        <div className='h-[90%] w-[60%] flex justify-start items-center'>
                            <p>{item.title.length > 40 ? item.title.splice(0, 40) + "..." : item.title}</p>
                        </div>
                        <div className='h-[90%] w-[20%] flex justify-center items-center rounded-lg bg-[#e3e6e6]'>
                            <p>&#8377;{(item.price*83.48.toFixed(2) - ((item.discountPercentage*item.price*83.48.toFixed(2))/100)).toFixed(2)}</p>
                        </div>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
        <div className='h-[70%] w-[25%] border-[1px] border-black flex flex-col justify-evenly items-center rounded-xl bg-white'>
          <div className='h-[15%] w-full flex justify-start items-center border-b-[1px] border-black text-2xl'><p className='ml-5'>Price Details:</p></div>
          <div className='h-[70%] w-full'>
            <div className='h-[20%] w-full text-xl flex justify-between items-center'>
              <p className='ml-3'>Price:</p>
              <p className='mr-3'>&#8377;{calculateTotalPrice()}</p>
            </div>
            <div className='h-[20%] w-full text-xl flex justify-between items-center'>
              <p className='ml-3'>Discount:</p>
              <p className='mr-3'>-&#8377;{calculateTotalDiscount()}</p>
            </div>
            <div className='h-[20%] w-full text-xl flex justify-between items-center'>
              <p className='ml-3'>Shipping:</p>
              <p className='mr-3'>&#8377;{(((calculateTotalPrice() - calculateTotalDiscount()) > 500) || (selected.length <= 0)) ? 0 : 40}</p>
            </div>
            <div className='h-[30%] w-full text-xl border-y-[1px] border-black mt-5 flex justify-between items-center'>
              <p className='ml-3'>Total:</p>
              <p className='mr-3'>&#8377;{(calculateTotalPrice() - calculateTotalDiscount()).toFixed(2)}</p>
            </div>
          </div>
          <button className='h-[10%] w-[70%] bg-[#ffd814] rounded-full'
          onClick={handleOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder