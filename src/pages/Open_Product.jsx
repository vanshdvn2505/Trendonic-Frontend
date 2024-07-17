import React, {useEffect, useState} from 'react'
import {setOpenProd} from '../features/openProd/openProdSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setSearch } from '../features/search/searchSlice'
import {setProduct} from '../features/product/productSlice'
import { addItem, removeItem, clearCart} from '../features/cart/cartSlice';
import axios from 'axios'


function Open_Product() {

  const dispatch = useDispatch();
  const openProd = useSelector(state => state.openProd.value);
  const auth = useSelector(state => state.auth.value)
  const selected = useSelector(state => state.cart.selected)
  const [openedProduct, setOpenedProduct] = useState(openProd);
  const [selectImg, setImg] = useState(openProd.images[0]);
  const [panel, setPanel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilar = async (input) => {
      try {
        const response = await axios.post('http://localhost:7000/product/similar', {input}, { withCredentials: true });
        setPanel(response.data.data.prod);
      }
      catch(error){
        console.log("Error At Fetching Panel " + error);
        alert("Something Went Wrong !!")
      }
    }
    fetchSimilar(openedProduct.category);
  }, [])

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

  const rating = (x) => {
    let num = Math.floor(x);
    let stars = [];
    while(num > 0){
      stars.push(<i key={num} className="fa-solid fa-star text-[#de7921]"></i>);
      num--;
    }
    if(x%1 != 0){
      stars.push(<i key={x + 1} className="fa-regular fa-star-half-stroke text-[#de7921]"></i>);
    }
    num = 5 - stars.length;
    while(num > 0){
      stars.push(<i key={num + 100} className="fa-regular fa-star text-[#de7921]"></i>);
      num--;
    }
    return stars;
  }

  const openProduct = (prod) => {
    try {
        dispatch(setOpenProd(prod));
        const newWindow = window.open('http://localhost:5173/open_product/' + prod._id, '_blank')
        if(newWindow){
            newWindow.focus();
        }
    }
    catch(error){
        console.log("Error At Open Product " + error);    
        alert("Something Went Wrong !!")
    }
  }

  const addToCart = async (id) => {
    try{
      let userId;
      if(auth != null){
        userId = auth.email;
      }
      else{
        navigate('/signin');
        return;
      }
      const response = await axios.post('http://localhost:7000/product/addToCart', {id, userId});
      alert(response.data.message);
    }
    catch(error){
      console.log("Error At Add To Cart " + error);  
    }
  }

  if(!openedProduct){
    return (
      <div className='h-[90vh] w-full mt-[10vh] text-3xl text-[#000] flex flex-col justify-center items-center bg-white'>
          <i className="fa-solid fa-spinner mb-3 animate-spin-fast"></i>
          <p>Loading...</p>
      </div>
    )
  }

  const buyNow = async (item) => {
    try {
      dispatch(clearCart());
      dispatch(addItem(item));
      navigate('/placeOrder')
    }
    catch(error){
      console.log("Error At Buy Now " + error);
      alert(error.message);  
    }
  }

  return (
    <div className='min-h-[90vh] h-auto w-full mt-[10vh] flex flex-col'>
         <div className='h-[7vh] w-full flex justify-start items-center bg-[#232f3e]'>
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
        <div className='h-[85vh] w-full flex border-b-4'>
            <div className='h-[85vh] w-[50%] flex flex-col justify-center items-center '>
                <div className='h-[80%] w-[90%] bg-[#e3e6e6]'>
                    <img className='h-full w-full object-cover' src={selectImg} alt="" />
                </div>
                <div className='h-[15%] w-[95%] flex justify-center items-center'>
                    <div className='h-full w-[70%]  flex justify-evenly items-center overflow-x-auto scrollbar-hide'>
                        {openedProduct.images.map(image => (
                          <button key={image} className={`h-[90%] w-[20%] flex-shrink-0 mx-1 rounded-md bg-white ${selectImg == image ? 'border-2 border-[#007185]' : 'border-[1px] border-[#d5d9d9]'}`}
                          onClick={() => setImg(image)}>
                                <img className='h-full w-full object-cover' src={image} alt="" />
                          </button>
                        ))}
                    </div>
                    <div className='h-full w-[30%] flex flex-col justify-evenly items-center'>
                        <button className='w-[80%] h-[45%] rounded-full bg-[#ffd814]'
                        onClick={() => addToCart(openedProduct._id)}>
                          Add To Cart
                        </button>
                        <button className='w-[80%] h-[45%] rounded-full bg-[#ffa41c]'
                        onClick={() => buyNow(openedProduct)}>
                          Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='min-h-[85vh] h-auto w-[50%] border-l-2 flex flex-col items-center overflow-y-auto scrollbar-hide'>
                <p className='min-h-[10vh] h-auto w-[95%] mt-5 my-2 font-semibold flex justify-start items-center text-4xl'>
                  {openedProduct.title}
                </p>
                <div className='min-h-[20vh] h-auto w-[95%] my-[2%] border-y-2'>
                  <p className='h-[50%] w-full font-semibold flex justify-start items-end'>
                    <span className='text-2xl text-[#cc0c39] font-normal'>- {openedProduct.discountPercentage}% &nbsp;
                    </span>
                    <span className='text-4xl'>
                      &#8377;{(openedProduct.price*83.48.toFixed(2) - ((openedProduct.discountPercentage*openedProduct.price*83.48.toFixed(2))/100)).toFixed(2)}&nbsp;
                    </span>
                  </p>
                  <p className='h-[50%] w-full text-[#565959] font-semibold flex justify-start items-center'>
                     M.R.P: &nbsp; <strike> &#8377;{(openedProduct.price*83.48).toFixed(2)}</strike>&nbsp;
                  </p>
                </div>
               {openedProduct.description && (
                 <div className='min-h-[20vh] h-auto w-[95%] mb-2 flex flex-col justify-evenly items-start border-b-2'>
                    <p className='text-2xl'>Description:</p>
                    <p>{openedProduct.description}</p>
                </div>
               )}
               {openedProduct.dimensions && (
                 <div className='min-h-[20vh] h-auto w-[95%] my-2 flex justify-center items-center border-b-2'>
                    <div className='min-h-[20vh] h-auto w-[50%] flex flex-col justify-evenly items-start'>
                      <p className='text-2xl'>Dimensions:</p>
                      <p>Height: {openedProduct.dimensions.height}</p>
                      <p>Width: {openedProduct.dimensions.width}</p>
                      <p>Depth: {openedProduct.dimensions.depth}</p>
                    </div>
                    <div className='min-h-[20vh] h-auto w-[50%] flex flex-col justify-evenly items-start'>
                      <p className='text-2xl'>Category: <span className='text-base'>{openedProduct.category}</span></p>
                      <div className='h-[10vh] w-full flex flex-wrap justify-start items-center text-2xl'>Tags: 
                        {openedProduct.tags.map(tag => (
                          <span key={tag} className='h-[5vh] min-w-[10vh] w-auto mx-2 p-1 flex justify-center items-center text-base bg-[#e3e6e6] rounded-full'>{tag}</span>
                        ))}
                      </div>
                    </div>
                </div>
               )}
               <div className='min-h-[30vh] h-auto w-[95%] flex flex-col justify-evenly items-start border-b-2'>
                  <p className='text-2xl'>Product Info:</p>
                  <p>Brand: {openedProduct.brand}</p>
                  <p>Weight: {openedProduct.weight}</p>
                  <p className='flex justify-evenly items-center'>Rating: {openedProduct.rating}&nbsp;{rating(openedProduct.rating)}</p>
                  <p>Warranty: {openedProduct.warrantyInformation}</p>
                  <p>Return Policy: {openedProduct.returnPolicy}</p>
                  <p>Shipment: {openedProduct.shippingInformation}</p>
               </div>
               <div className='min-h-[20vh]! h-auto w-[95%] flex flex-col justify-evenly items-start my-2'>
                  <p className='text-2xl mb-2'>Product Reviews:</p>
                  <div className='h-[10vh] w-[90%] flex justify-evenly items-center'>
                      <input type="text" placeholder='Write Review' 
                      className='h-[8vh] w-[50%] pl-2 rounded-lg outline-none text-black text-lg bg-[#e3e6e6]'/>
                      <button className='h-[8vh] w-[40%] rounded-lg bg-[#ffd814]'>
                        Post Review
                      </button>
                  </div>
                  {openedProduct.reviews.map(review => (
                    <div className='min-h-[15vh] h-auto w-[70%] m-2 rounded-xl flex flex-col justify-evenly items-center bg-[#e3e6e6]'>
                        <div className='h-[7vh] w-[95%] flex'>
                            <div className='h-full w-[20%] flex justify-center items-center'>
                              <i className="fa-solid fa-circle-user text-4xl"></i>
                            </div>
                            <div className='h-full w-[80%]'>
                                <p>{review.reviewerName}</p>
                                <p>{review.reviewerEmail}</p>
                            </div>
                        </div>
                        <div className='min-h-[8vh] h-auto w-[95%]'>
                            <p>{rating(review.rating)}</p>
                            <span>{review.comment}</span>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
        </div>
        <div className='h-[70vh] w-full flex flex-col justify-center items-center'>
            <div className='h-[10vh] w-[95%] flex justify-start items-center'>
                  <p className='text-2xl ml-3'>Some Similar Products You Must Look At:</p>
            </div>
            <div className='h-[50vh] w-[95%] flex justify-evenly items-center overflow-x-auto'>
                {panel.map(i => (
                    <button key={i._id} className='h-[90%] w-[25%] flex-shrink-0 mx-3 bg-[#e3e6e6]'
                    onClick={() => openProduct(i)}>
                        <div className='h-full w-full'>
                          <img className='h-full w-full bg-cover' src={i.images[0]} alt="Loading..."/>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Open_Product