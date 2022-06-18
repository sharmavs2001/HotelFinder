import React, {useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import HotelFinder from "../apis/HotelFinder"
import "./updatehotel.css";

const UpdateHotel = (props) => {
  const { id } = useParams();
  let navigate = useNavigate()

  const [ name, setName ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ priceRange, setPriceRange ] = useState("");
  
 useEffect(()=>{
        const fetchData= async() => {

        const response = await HotelFinder.get(`/${id}`)
       
        setName(response.data.data.Hotels.name)
        setLocation(response.data.data.Hotels.location)
        setPriceRange(response.data.data.Hotels.price_range)
         
    }


       fetchData()
 })

 const handleSubmit = async(e) => {
    e.preventDefault();
     const updatedHotel = await HotelFinder.put(`/${id}`,{
         name,
         location,
         price_range:priceRange
     })
    navigate("/")
    }
    
  return (
      <form className = "form" action ="">
        <div className="form-group">
        <label htmlFor="name" className="white">Name</label>
        <input
          id="name"
          value={name}  
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location" className="white">Location</label>
        <input
        id="location"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="location"
        />
        <div />
        <div className="form-group">
          <div>
          <label htmlFor="sel" > Price Range </label>
          </div>
          <select
         
          id="sel"
            defaultValue={priceRange}
            
            onChange={(e) => setPriceRange(e.target.value)
            
            }
            className="form-select form-select-sm" 
            aria-label=".form-select-lg example"
          > 
        <option style={{color: "grey"}} value="default" disabled hidden>
          select price range
        </option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Update Hotel
        </button>
      </div>
      
      </form>
    
  );
};

export default UpdateHotel;
