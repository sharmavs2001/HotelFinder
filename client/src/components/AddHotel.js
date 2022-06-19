import React, { useContext, useState } from "react";
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from "../context/HotelsContext";
import "./addhotel.css";

const AddHotel = () => {
  const { addHotels } = useContext(HotelsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("default");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const formData = new FormData();
    formData.append('File', image);
    formData.append('Name', name);
    formData.append('Location', location);
    formData.append('PriceRange', priceRange);

      const response = await HotelFinder.post("", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      addHotels(response.data.data.Hotels[0]);
    };


  return (
    <form className="form">
      <h1 className="head">Add Hotel</h1>
      <div className="form-group">
        <label htmlFor="name" className="white">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location" className="white">
          Location
        </label>
        <input
          id="location"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Location"
        />
        <div />
        <div className="form-group">
          <div>
            <label htmlFor="sel"> Price Range </label>
          </div>
          <select
            id="sel"
            defaultValue={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-select form-select-sm"
            aria-label=".form-select-lg example"
          >
            <option id="sel" value="default" disabled hidden>
              Select price range
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
            <label className="form-label" htmlFor="customFile">
              Upload Image
            </label>
            <input onChange={ (event) => { setImage( event.target.files[0]); } } type="file" accept="image/png, image/jpeg" className="form-control" id="customFile" />
          </span>
          <button id ="addbtn"
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
