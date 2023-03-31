import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './components/navbar/Navbar'

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  )
}

export default Layout