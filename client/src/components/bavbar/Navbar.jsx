import React, { useState } from 'react'
import './navbar.css'

const Navbar = () => {
  const [search, setSearch] = useState("")

  const handleChange = ({ target }) => {
    setSearch(target.value)
    const timeout = setTimeout(() => {
      console.log('timout')
    }, 500)
    return clearTimeout(timeout)
  }

  return (
    <div className='navbar'>
      <div className="navbar-left">Movie Recommender</div>
      <div className="navbar-center">
        <input type="text" name="search" value={search || ''} onChange={handleChange} placeholder=" e.g: Inception " />
      </div>
      <div className="navbar-right"></div>
    </div>
  )
}

export default Navbar