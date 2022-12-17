import React from 'react'
import "./Maillist.scss"
const Maillist = () => {
  return (
    <div className='mail'>
      <h1 className="mtitle">Save time, save money!</h1>
      <span className='mdesc'>Sign up and we'll send the best deals to you</span>
      <div className="minputcontainer">
        <input className='minp' type="text" placeholder='Your Email' />
        <button className='mbtn'>Subscribe</button>
      </div>
    </div>
  )
}

export default Maillist
