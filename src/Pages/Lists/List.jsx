import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import "./List.scss";
import {format} from "date-fns"
import { DateRange } from 'react-date-range';
import Searchitem from '../../Components/Searchitem/Searchitem';
import useFetch from '../../Hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [destination,setDestination] = useState(location.state.destination);
  const [minPrice,setminPrice] = useState(undefined);
  const [maxPrice,setmaxPrice] = useState(undefined);

  const [options,setOptions] = useState(location.state.options);
const [date,setDate] = useState(location.state.date);
const [openDate,setOpenDate] = useState(false);
const {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination}&min=${minPrice || 1}&max=${maxPrice || 12000}`);
const handleClick = ()=>{
  reFetch();
}
  return (
    <div className='list'>
      <Navbar/>
      <Header type = "list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lstitle">Search</h1>
            <div className="lsitem">
              <label >Destination: </label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsitem">
              <label>Check-in Date: </label>
              <span onClick={()=> setOpenDate(!openDate)}>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
              {
                openDate && <DateRange
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                ranges={date}
                editableDateInputs={true} 
              />        
              }   
            </div>
            <div className="lsitem">
              <label>Options:</label>
              <div className="option">
              <div className="lsoption">
                <div className="lsoptiontext">Min price per night:</div>
                <input type="number" onChange={(e) => setminPrice(e.target.value)} className="lsoptioninput" />
              </div>
              <div className="lsoption">
                <div className="lsoptiontext">Max price per night:</div>
                <input type="number" onChange={(e) => setmaxPrice(e.target.value)} className="lsoptioninput" />
              </div>
              <div className="lsoption">
                <div className="lsoptiontext">Adult:</div>
                <input type="number" min={1} className="lsoptioninput" placeholder={options.adult}/>
              </div>
              <div className="lsoption">
                <div className="lsoptiontext">Children:</div>
                <input type="number" min={0} className="lsoptioninput" placeholder={options.children} />
              </div>
              <div className="lsoption">
                <div className="lsoptiontext">Room:</div>
                <input type="number" min={1} className="lsoptioninput" placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button className='searchButton' onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading Please Wait" : data.map((item)=>{
              return <Searchitem item={item} key={item._id}/>
            })
            }
            

          </div>

        </div>
      </div>
    </div>
  )
}

export default List
