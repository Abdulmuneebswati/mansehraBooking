import React from 'react'
import useFetch from '../../Hooks/useFetch';
import "./Featureproperties.scss"
const Featureproperties = () => {
  const {data,loading,error} = useFetch("/hotels?featured=false&min=1000&max=12000&limit=4");
  return (
    <div className='fp'>
      {loading ? "Loading Please wait" : (  data.map((item,i)=>{ return <div key={i} className="fpitem">
      <img src={item.photos[0]} alt="" className="fpimg" />
      <span className="fpname">{item.name}</span>
      <span className="fpcity">{item.city}</span>
      <span className="fpprice">Starting from RS-{item.cheapestPrice}</span>
      { item.rating && <div className="fprating">
        <button className='fpbtn'>{item.rating}</button>
        <span className='fpspan'>Excellent</span>
      </div>}
      </div>}))}
      
    </div>
  )
}

export default Featureproperties
