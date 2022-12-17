import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Feature from '../../Components/Feature/Feature'

import "./Home.scss"
import Propertylist from '../../Components/PropertyList/Propertylist'
import Featureproperties from '../../Components/Featureproperties/Featureproperties'
import Maillist from '../../Components/Maillist/Maillist'
import Footer from '../../Components/Footer/Footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Feature/>
        <h1 className='htitle'>Browse by property type</h1>
        <Propertylist/>
        <h1 className='htitle'>Homes guests love</h1>
        <Featureproperties/>
        <Maillist/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
