import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import "./Navbar.scss"
const Navbar = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className="navContainer">
      <span className='logo'>mansehrabooking</span>
      {user ? user.username : <div className="navItems">
        <button className='navBtn'>Register</button>
        <button className='navBtn'>Login</button>
      </div>}
      </div>
    </div>
  )
}

export default Navbar
