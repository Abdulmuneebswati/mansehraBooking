import { CalendarMonthOutlined,  Hotel, HotelOutlined, Person2Outlined } from '@mui/icons-material'
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./Header.scss"
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
const Header = ({type}) => {
    const {dispatch} = useContext(SearchContext)
    const [destination,setDestination] = useState("");
    const [openDate,setOpenDate] = useState(false);
    const [openOptions,setOpenOptions] = useState(false);
    const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1,
    });
    const [dates,setDates] = useState([{
        startDate: new Date(),
        endDate:new Date(),
        key:'selection'
    }]);
    const handleOption = (name,operation)=>{
        setOptions(prev=>{return {
            ...prev,[name] : operation === "i" ? options[name] + 1 : options[name] - 1 
        }})
    }
    const navigate = useNavigate();
    const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates}})
        navigate("/hotels",{state:{destination,dates,options}});
    }
  return (
    <div className='header'>
    <div className={type === "list"? " headerContainer listMode" :"headerContainer"}>
      <div className="headerList">
        <div className="headerListItem active">
        <Hotel/>        
        <span>Stays</span>
        </div>
      </div>
      {
        type !== "list" && <div className="title">
        <h1 className="htitle">A lifetime of discounts? It's Genius.</h1>
        <p className="hdesc">Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account</p>
              <button className="hbtn">Sign in / Register</button>
      <div className="hsbar">
        <div className="hsbaritem">
            <HotelOutlined className="hicons"/>
            <input type="text" placeholder='Where are you going?' onChange={e=>setDestination(e.target.value)} className='hsbarinput' />
        </div>
        <div className="hsbaritem">
            <CalendarMonthOutlined className="hicons"/>
            <span className='hsbartext' onClick={()=> setOpenDate(!openDate)}>
            {`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}
            </span>
            {
                openDate && <DateRange editableDateInputs={true} 
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
            />
            }
        </div>
        <div className="hsbaritem">
            <Person2Outlined className="hicons"/>
            <span className='hsbartext' onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adult . ${options.children} chlidren . ${options.room} room`}</span>
            {
                openOptions && <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button disabled={options.adult <=1} className='optionBtn' onClick={()=>handleOption("adult","d")}>-</button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button className='optionBtn' onClick={()=>handleOption("adult","i")}>+</button>
                    </div>

                </div>
                <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">

                    <button className='optionBtn' disabled={options.children <=0} onClick={()=>handleOption("children","d")}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button className='optionBtn' onClick={()=>handleOption("children","i")}>+</button>
                    </div>

                </div>
                <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button className='optionBtn' disabled={options.room <=1} onClick={()=>handleOption("room","d")}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className='optionBtn' onClick={()=>handleOption("room","i")}>+</button>
                    </div>

                </div>
            </div>
            }
        </div>
        <div className="hsbaritem" >
            <button className='hbtn' onClick={handleSearch}>Search</button>

        </div>
      </div>
      </div>
      }

      </div>
    </div>
  )
}
export default Header
