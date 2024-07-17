import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addItem, removeItem } from '../features/cart/cartSlice';
import { setOpenProd } from '../features/openProd/openProdSlice'
import { setSearch } from '../features/search/searchSlice'
import { setProduct } from '../features/product/productSlice'
import { useNavigate, Link } from 'react-router-dom';

function Cart() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const selected = useSelector(state => state.cart.selected)
    const openProd = useSelector(state => state.openProd.value);
    const [cartItems, setCart] = useState([]);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const userId = auth.email;
            const response = await axios.post('http://localhost:7000/product/fetchCart', { userId }, { withCredentials: true });
            setCart(response.data.data.result);
        }
        catch (error) {
            console.log("Error At Fetch Cart " + error);
            alert("Something Went Wrong!")
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

    useEffect(() => {
        fetchCart();
    }, [])

    const removeFromCart = async (item) => {
        try {
            dispatch(removeItem(item));
            const id = item._id;
            const userId = auth.email;
            const response = await axios.post('http://localhost:7000/product/removeFromCart', { id, userId }, { withCredentials: true });
            alert(response.data.message);
            location.reload()
        }
        catch (error) {
            console.log("Error At Remove From Cart " + error);
            alert("Something Went Wrong!")
        }
    }

    const handleCheckboxChange = (item) => {
        if (selected.find(i => i._id === item._id)) {
            dispatch(removeItem(item))
        } else {
            dispatch(addItem(item))
        }
    }

    const openProduct = (prod) => {
        try {
            dispatch(setOpenProd(prod));
            const newWindow = window.open('http://localhost:5173/open_product/' + prod._id, '_blank')
            if (newWindow) {
                newWindow.focus();
            }
        }
        catch (error) {
            console.log("Error At Open Product " + error);
            alert("Something Went Wrong !!")
        }
    }

    const calculateTotalPrice = () => {
        return (selected.reduce((total, item) => total + (item.price * 83.48.toFixed(2)), 0)).toFixed(2);
    };

    const calculateTotalDiscount = () => {
        return ((selected.reduce((total, item) => total + ((item.discountPercentage * item.price * 83.48.toFixed(2)) / 100), 0))).toFixed(2);
    };

    return (
        <div className='h-[90vh] w-full mt-[10vh] flex flex-col justify-center items-center bg-[#e3e6e6]'>
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
            <div className='h-[92%] w-full flex justify-center items-center'>
                {cartItems.length > 0 ? (
                    <div className='h-full w-full flex justify-evenly items-center'>
                        <div className='h-[95%] w-[70%] rounded-xl flex flex-col justify-evenly items-center bg-white'>
                            <div className='h-[15%] w-[90%] text-4xl flex justify-start items-center'>
                                <p>Shopping Cart</p>
                            </div>
                            <div className='h-[80%] w-[90%] bg-[#e3e6e6] rounded-xl border-b-[1px] flex flex-col justify-evenly items-center overflow-y-auto'>
                                {cartItems.map((item, index) => (
                                    <div key={index} className='h-[50%] w-[90%] flex justify-evenly items-center rounded-lg flex-shrink-0 m-5 bg-white'>
                                        <div className='h-full w-[10%] rounded-l-lg flex justify-center items-center'>
                                            <input
                                                type="checkbox"
                                                className='h-[10%] w-[20%]'
                                                checked={selected.find(i => i._id === item._id) !== undefined}
                                                onChange={() => handleCheckboxChange(item)}
                                                style={{ accentColor: '#017589' }}
                                            />
                                        </div>
                                        <div className='h-full w-[90%] flex justify-center items-center rounded-r-lg'>
                                            <button className='h-full w-[30%]'
                                                onClick={() => openProduct(item)}>
                                                <img className='h-[90%] w-full object-cover' src={item.images[0]} alt="Loading..." />
                                            </button>
                                            <div className='h-full w-[70%] relative flex flex-col justify-evenly items-start ml-3'>
                                                <p className='text-xl font-semibold w-[60%]'>{item.title}</p>
                                                <p>Brand: {item.brand}</p>
                                                <p>Ratings: {item.rating}</p>
                                                <p>Warranty: {item.warrantyInformation}</p>
                                                <p>Shipping: {item.shippingInformation}</p>
                                                <p className='text-xl absolute top-2 right-2'>Price:&nbsp; &#8377;{(item.price * 83.48.toFixed(2) - ((item.discountPercentage * item.price * 83.48.toFixed(2)) / 100)).toFixed(2)}</p>
                                                <button className='h-[15%] w-[20%] bg-[#ffa41c] rounded-md absolute bottom-2 right-2'
                                                    onClick={() => removeFromCart(item)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='h-[70%] w-[25%] flex flex-col justify-evenly items-center rounded-xl bg-white'>
                            <div className='h-[15%] w-full flex justify-start items-center border-b-2 text-2xl'><p className='ml-5'>Price Details:</p></div>
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
                                <div className='h-[30%] w-full text-xl border-y-2 mt-5 flex justify-between items-center'>
                                    <p className='ml-3'>Total:</p>
                                    <p className='mr-3'>&#8377; {(
                                        (calculateTotalPrice() - calculateTotalDiscount()) +
                                        (((calculateTotalPrice() - calculateTotalDiscount()) > 500 || selected.length <= 0) ? 0 : 40)
                                    ).toFixed(2)}</p>
                                </div>
                            </div>
                            <Link to='/placeOrder' className='h-[10%] w-[70%]'>
                                <button className='h-full w-full bg-[#ffd814] rounded-full'>
                                    Proceed To Buy
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className='h-[60%] w-[80%] rounded-xl mt-[5%] flex flex-col justify-evenly items-start bg-white'>
                            <p className='text-5xl ml-[5%]'>Your Trendonic Cart Is Empty</p>
                            <p className='text-xl ml-[5%]'>Your shopping cart is waiting. Give it purpose - fill it with groceries, clothing, household supplies, electronics and more.
                                Continue shopping on the Trendonic.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart