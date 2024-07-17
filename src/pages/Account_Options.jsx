import React from 'react'
import { Link } from 'react-router-dom'

function Account_Options() {
  return (
    <div className='h-[90vh] w-full mt-[10vh] overflow-y-auto'>
        <div className='h-[80vh] w-full flex flex-col justify-center items-center'>
            <div className='h-[20%] w-[80%] flex justify-start items-center'>
                <p className='text-4xl'>Your Account</p>
            </div>
            <div className='h-[80%] w-[80%] grid grid-cols-3 border-b-[1px] border-[#d5d9d9]'>
                <Link to='/yourOrders' className='h-[60%] w-[80%]'>
                  <div className='h-full w-full flex rounded-lg border-[1px] border-[#d5d9d9]
                  hover:bg-[#e6e6e6]'>
                    <div className='h-full w-[40%] rounded-l-lg flex justify-center items-center'>
                      <i className="fa-solid fa-gift text-5xl text-[#0ca8e1]"></i>
                    </div>
                    <div className='h-full w-[60%] flex flex-col justify-evenly'>
                        <p>Your Orders</p>
                        <p className='text-[#565959]'>Track, return, buy things again</p>
                    </div>
                  </div>
                </Link>
                <Link to='/login_security' className='h-[60%] w-[80%]'>
                  <div className='h-full w-full flex rounded-lg border-[1px] border-[#d5d9d9]
                  hover:bg-[#e6e6e6]'>
                    <div className='h-full w-[40%] rounded-l-lg flex justify-center items-center'>
                      <i className="fa-solid fa-shield-halved text-5xl text-[#4f4dbb]"></i>
                    </div>
                    <div className='h-full w-[60%] flex flex-col justify-evenly'>
                        <p>Login & Security</p>
                        <p className='text-[#565959]'>Edit login name & mobile number</p>
                    </div>
                  </div>
                </Link>
                <Link to='/address' className='h-[60%] w-[80%]'>
                  <div className='h-full w-full flex rounded-lg border-[1px] border-[#d5d9d9]
                  hover:bg-[#e6e6e6]'>
                    <div className='h-full w-[40%] rounded-l-lg flex justify-center items-center'>
                      <i className="fa-solid fa-location-dot text-5xl text-[#f7971f]"></i>
                    </div>
                    <div className='h-full w-[60%] flex flex-col justify-evenly'>
                        <p>Your Addresses</p>
                        <p className='text-[#565959]'>Edit addresses for orders</p>
                    </div>
                  </div>
                </Link>
                <Link className='h-[60%] w-[80%]'>
                  <div className='h-full w-full flex rounded-lg border-[1px] border-[#d5d9d9]
                  hover:bg-[#e6e6e6]'>
                    <div className='h-full w-[40%] rounded-l-lg flex justify-center items-center'>
                      <i className="fa-solid fa-wallet text-5xl text-[#1e90bc]"></i>
                    </div>
                    <div className='h-full w-[60%] flex flex-col justify-evenly'>
                        <p>Trendonic Balance</p>
                        <p className='text-[#565959]'>Add money to your balance</p>
                    </div>
                  </div>
                </Link>
                <Link className='h-[60%] w-[80%]'>
                  <div className='h-full w-full flex rounded-lg border-[1px] border-[#d5d9d9]
                  hover:bg-[#e6e6e6]'>
                    <div className='h-full w-[40%] rounded-l-lg flex justify-center items-center'>
                      <i className="fa-solid fa-phone-volume text-5xl text-[#00464f]"></i>
                    </div>
                    <div className='h-full w-[60%] flex flex-col justify-start pt-5'>
                        <p>Contact Us</p>
                    </div>
                  </div>
                </Link>
                
            </div>

        </div>

    </div>
  )
}

export default Account_Options