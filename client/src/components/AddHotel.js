import React, { useContext, useState } from "react";
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from "../context/HotelsContext";
import "./addhotel.css";

const AddHotel = () => {
  const { addHotels } = useContext(HotelsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("default");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents html from reloading

    try {
      const response = await HotelFinder.post("", {
        name,
        location,
        price_range: priceRange,
      });
      
      addHotels(response.data.data.Hotels[0]);

    } catch (error) {}
  };

  return (
    <form className ="form">
      <h1>Add Hotel</h1>
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
        <option  id = "sel"  value="default" disabled hidden>
          select price range
        </option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div>
          <span>
       
        </span>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Add Hotel
        </button>
        </div>
      </div>
    </form>
  );
};

export default AddHotel;
