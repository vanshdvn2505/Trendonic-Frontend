import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '../components/Carousel'
import "../fonts/SourceSansPro.ttf"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setAuth} from '../features/auth/authSlice'
import { setSearch } from '../features/search/searchSlice'
import {setProduct} from '../features/product/productSlice'
import {setOpenProd} from '../features/openProd/openProdSlice'


function Home() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.value)
  const search = useSelector(state => state.search.value);
  const product = useSelector(state => state.product.value);
  const openProd = useSelector(state => state.openProd.value);
  const [panel1, setPanel1] = useState([]);
  const [panel2, setPanel2] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await axios.get('http://localhost:7000/product/panels', { withCredentials: true });
        setPanel1(response.data.data.prod1);
        setPanel2(response.data.data.prod2);
      }
      catch(error){
        console.log("Error At Fetching Panel1 " + error);
        alert("Something Went Wrong !!")
      }
    }
    fetchPanels();
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
  
  // const [help, setHelp] = useState(true);
  // useEffect(() => {
  //   if(help == true){
  //     const upload = async () => {
  //       try {
  //           const resp = await axios.post('http://localhost:7000/save-products')
  //           console.log(resp.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     upload();
  //   }
  //   setHelp(false);
  // }, [])

  return (
    <div className='min-h-[90vh] h-auto w-full mt-[10vh] flex flex-col bg-[#e3e6e6]'>
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
        <div className='h-[40vh] w-full relative flex'>
            <Carousel />
        </div>
        <div className='h-[200vh] w-full flex flex-col justify-evenly items-center z-10'>
            <div className='h-[60vh] w-full mb-10 grid grid-cols-3'>
                <div className='h-[95%] w-[90%] rounded-xl mt-3 ml-5 flex flex-col justify-center items-center bg-white'>
                    <div className='h-[20%] w-full flex justify-start items-center '>
                        <p className='text-3xl ml-[3%] font-bold'>Bestsellers In Beauty</p>
                    </div>
                    <div className='h-[70%] w-[90%] flex justify-evenly items-center '>
                        <div className='h-[90%] w-[45%]'>
                            <img className='h-full w-full' src="https://m.media-amazon.com/images/I/51wVc+BjoHL._AC_UL480_FMwebp_QL65_.jpg" alt="Loading..." />
                        </div>
                        <div className='h-[100%] w-[45%] flex flex-col justify-evenly items-center'>
                              <div className='h-[45%] w-full'>
                                  <img className='h-full w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrTXCksJraAxZW8YirN-W_P8ibnp0nfwfrw&s" alt="Loading..." />
                              </div>
                              <div className='h-[45%] w-full'>
                                  <img className='h-full w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppux1ZNEr9slPyM2KYv31ox07RpEuJevRrA&s" alt="Loading..." />
                              </div>
                        </div>
                    </div>
                    <div className='h-[10%] w-[100%] flex justify-start items-center'>
                        <button className='h-[70%] w-[20%] ml-3 text-[#007185]'
                        onClick={() => searchProduct("Beauty")}>See more</button>
                    </div>
                </div>
                <div className='h-[95%] w-[90%] rounded-xl mt-3 ml-5 bg-white'>
                    <div className='h-[20%] w-full flex justify-start items-center '>
                        <p className='text-3xl ml-[3%] font-bold'>Upto 60% Off | Footwear</p>
                    </div>
                    <div className='h-[70%] w-[90%] flex justify-evenly items-center '>
                        <div className='h-[90%] w-[45%]'>
                            <img className='h-full w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKQuzS3rBrpw00YLHcjirKLUZsgtKsJlHXjA&s" alt="Loading..." />
                        </div>
                        <div className='h-[100%] w-[45%] flex flex-col justify-evenly items-center'>
                              <div className='h-[45%] w-full'>
                                  <img className='h-full w-full' src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/July/BTF/1st/Pcqc3-2-hi._SY232_CB554637206_.jpg" alt="Loading..." />
                              </div>
                              <div className='h-[45%] w-full'>
                                  <img className='h-full w-full' src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/July/BTF/1st/Pcqc3-3-hi._SY232_CB554637206_.jpg" alt="Loading..." />
                              </div>
                        </div>
                    </div>
                    <div className='h-[10%] w-[100%] flex justify-start items-center'>
                        <button className='h-[70%] w-[20%] ml-3 text-[#007185]'
                         onClick={() => searchProduct("Shoes")}>See more</button>
                    </div>
                </div>
                <div className='h-[95%] w-[90%] rounded-xl mt-3 ml-5 bg-white'>
                    <div className='h-[20%] w-full flex justify-start items-center '>
                        <p className='text-3xl ml-[3%] font-bold'>Upto 60% Off | Footwear</p>
                    </div>
                    <div className='h-[70%] w-[90%] flex justify-evenly items-center '>
                        <div className='h-[100%] w-[45%] flex flex-col justify-evenly items-center'>
                              <button className='h-[47%] w-full flex flex-col justify-evenly items-start'
                              onClick={() => searchProduct("Furniture")}>
                                  <img className='h-[87%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1isSyBfA6Xu8QHDL3I0Mq2_Tl8JFJKLcdfw&s" alt="Loading..." />
                                  <p className='text-[#007185]'>Furniture</p>
                              </button>
                              <button className='h-[47%] w-full flex flex-col justify-evenly items-start'
                              onClick={() => searchProduct("Groceries")}>
                                  <img className='h-[87%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5q9Q5HNYsQSJd9quJoCInBJ6fiGt-wvSXg&s" alt="Loading..." />
                                  <p className='text-[#007185]'>Groceries</p>
                              </button>
                        </div>
                        <div className='h-[100%] w-[45%] flex flex-col justify-evenly items-center'>
                              <button className='h-[47%] w-full flex flex-col justify-evenly items-start'
                              onClick={() => searchProduct("Clothing")}>
                                  <img className='h-[87%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNGLPrPpgtNgiZDV0gHOET-nvNqWHuew5EQ&s" alt="Loading..." />
                                  <p className='text-[#007185]'>Fashion</p>
                              </button>
                              <button className='h-[47%] w-full flex flex-col justify-evenly items-start'
                              onClick={() => searchProduct("Motorcycles")}>
                                  <img className='h-[87%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMJ3fsIKfHQA4MlqvjkQY6JNUd5e12z7NEg&s" alt="Loading..." />
                                  <p className='text-[#007185]'>Motorcycles</p>
                              </button>
                        </div>
                    </div>
                    <div className='h-[10%] w-[100%] flex justify-start items-center'>
                        <button className='h-[70%] w-[20%] ml-3 text-[#007185]'
                         >Explore All</button>
                    </div>
                </div>
            </div>
            <div className='h-[50vh] w-[95%] rounded-xl flex flex-col justify-center items-center bg-white'>
                <div className='h-[20%] w-full flex justify-start items-center '>
                    <p className='text-2xl ml-[2%] font-bold'>Some More Items To Explore</p>
                </div>
                <div className='h-[80%] w-[95%] flex justify-evenly items-center overflow-x-auto'>
                    {panel1.map(product => (
                      <button key={product._id} className='h-[90%] w-[25%] flex-shrink-0 mx-3 bg-[#e3e6e6]'
                      onClick={() => openProduct(product)}>
                          <div className='h-full w-full'>
                            <img className='h-full w-full bg-cover' src={product.images[0]} alt="Loading..."/>
                          </div>
                      </button>
                    ))}
                </div>
            </div>
            <div className='h-[50vh] w-[95%] rounded-xl flex flex-col justify-center items-center bg-white'>
                <div className='h-[20%] w-full flex justify-start items-center '>
                    <p className='text-2xl ml-[2%] font-bold'>Bestsellers In Laptops</p>
                </div>
                <div className='h-[80%] w-[95%] flex justify-evenly items-center overflow-x-auto'>
                    {panel2.map(i => (
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
    </div>
  )
}

export default Home