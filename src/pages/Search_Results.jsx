import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {setOpenProd} from '../features/openProd/openProdSlice'
import axios from 'axios'

function Search_Results() {

    const dispatch = useDispatch();
    const search = useSelector(state => state.search.value)
    const products = useSelector(state => state.product.value);
    const auth = useSelector(state => state.auth.value)
    const openProd = useSelector(state => state.openProd.value);

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
      const response = await axios.post('http://localhost:7000/product/addToCart', {id, userId}, { withCredentials: true });
      alert(response.data.message);
    }
    catch(error){
      console.log("Error At Add To Cart " + error);  
    }
  }

  return (
    <div className='min-h-[80vh] h-auto w-full mt-[10vh] bg-white'>
        {(!products) ? (
            <div className='h-[80vh] w-full flex justify-center items-center'>
                <div className='h-[60%] w-[30%] bg-[] rounded-3xl flex flex-col justify-evenly items-center'>
                    <p><i className="fa-solid fa-ban text-9xl text-red-600"></i></p>
                    <p className='text-2xl'>Oops, no products found, <Link to='/home' className='text-[#007185]'>go back</Link></p>
                </div>
            </div>
        ):(
            <div className='min-h-[80vh] h-auto relative flex flex-col justify-center items-center'>
                <div className='h-[20vh] w-[80%]  absolute z-30 top-0 flex flex-col justify-evenly items-start'>
                    <p className='text-xl'><Link to='/home' className='text-[#007185]'>Home</Link> &gt; Search Results</p>
                    <p className='text-3xl'>Search Results For {search}</p>
                </div>
                <div className='h-auto w-[80%] mt-[25vh] flex flex-wrap gap-2 justify-stretch items-center'>
                    {products.map(product => (
                        <div key={product._id} className='h-[70vh] w-[50vh] border-[1px] border-[#e3e6e6] rounded-xl'>
                            <div className='h-[50%] w-full rounded-t-xl'
                            onClick={() => openProduct(product)}>
                                <img className='h-full w-full bg-cover rounded-t-xl bg-[#e3e6e6]' src={product.images[0]} alt="Loading..." />
                            </div>
                            <div className='h-[50%] w-full flex flex-col justify-evenly items-center'>
                                <p className='text-2xl font-bold'>{product.brand}</p>
                                <p className='text-xl'>{product.title}</p>
                                <p>Rating: {product.rating}</p>
                                <p><span className='text-2xl'> &#8377;{(product.price*83.48.toFixed(2) - ((product.discountPercentage*product.price*83.48.toFixed(2))/100)).toFixed(2)} </span><span
                                className='text-[#565959]'>M.R.P: <strike> &#8377;{(product.price*83.48).toFixed(2)}</strike> </span><span>({product.discountPercentage}% off)</span></p>
                                <button className='h-[7vh] w-[20vh] rounded-full bg-[#ffd814]'
                                onClick={() => addToCart(product._id)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default Search_Results