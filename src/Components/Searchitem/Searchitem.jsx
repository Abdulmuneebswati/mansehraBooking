import React from 'react';
import { Link } from 'react-router-dom';
import "./Searchitem.scss";
const Searchitem = ({item}) => {
  return (
    <div className='sitem'>
      <img src={item.photos ? item.photos[0] : "https://a0.muscache.com/im/pictures/0b631624-6d16-46de-bc4d-4334afa2fbfd.jpg?im_w=2560"} alt="" className="simg" />
      <h1 className="sidesc">
      <span className="sititle">{item.name}</span>
      <span className="sidistance">{item.distance}m</span>
      <span className="sitaxiop">Free taxi from Abbotabad</span>
      <span className="sisubtitle">{item.title}</span>
      <span className="sifeatures">{item.desc}</span>
      <span className="sicancelop">Free cancellation</span>
      <span className="sicancelopsubtitle">You can cancel later, so lock in this great price today!</span>

      </h1>
      <div className="sidetails">
        { item.rating? <div className="sirating">
          <span className="res">Excellent</span>
          <button className="sires">8.9</button>
        </div> : <div className="sirating">
          <span className="res">Excellent</span>
          <button className="sires">{item.rating}</button>
        </div>}
        <div className="sidetailtext">
          <span className="siprice">RS-{item.cheapestPrice}</span>
          <span className="sitaxop">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}><button className="sicheckbtn">See availability</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Searchitem
