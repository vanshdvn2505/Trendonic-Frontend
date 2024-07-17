import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './src/components/Header'
import Footer from './src/components/Footer'

function Layout1() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout1