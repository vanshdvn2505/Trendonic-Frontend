import React from 'react'
import Logo from '../assets/Logo-White-Yellow.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='h-[40vh] w-full'>
        <button className='h-[15%] w-full flex justify-center items-center bg-[#37475a]
         hover:brightness-125' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <p className='text-white'>Back to top</p>
        </button>
        <div className='h-[85%] w-full flex justify-evenly items-center bg-[#232f3e]'>
            <div className=' h-full w-[30%] flex justify-center items-center'>
                <img src={Logo}/>
            </div>
            <div className=' h-full w-[30%] flex justify-center items-center'>
                <div className='h-[80%] w-[80%] text-white'>
                    <div className='h-[70%] w-full flex flex-col justify-center items-end'>
                        <p className='font-bold'>Trendonic</p>
                        <br/>
                        <p>Phone: +91 88XX-XXX88</p>
                        <p>Email: vanshdhawan2505@gmail.com</p>
                        <p>Address: IIIT-Allahabd, Jhalwa, Prayagraj</p>
                    </div>
                    <div className='h-[30%] w-full text-xl flex justify-evenly items-center'>
                        <Link to='https://www.facebook.com/vansh.dhawan.714'><i className="fa-brands fa-facebook"></i></Link>
                        <Link to='https://www.instagram.com/vansh.dvn/'><i className="fa-brands fa-instagram"></i></Link>
                        <Link to='https://www.linkedin.com/in/vanshdvn2505/'><i className="fa-brands fa-linkedin"></i></Link>
                        <Link to='https://github.com/vanshdvn2505'><i className="fa-brands fa-github"></i></Link>
                    </div>
                </div>
            </div>
            <div className=' h-full w-[30%] flex justify-center items-center'>
                <div className='h-[60%] w-[80%] text-white flex flex-col justify-center items-end'>
                    <p className='font-bold'>Let Us Help You</p>
                    <br></br>
                    <Link><p>About Us</p></Link>
                    <Link to='/account_options'><p>Your Account</p></Link>
                    <Link><p>Get in touch</p></Link>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer