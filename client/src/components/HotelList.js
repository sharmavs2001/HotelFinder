import React, { useEffect, useContext } from "react";
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from "../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import "./hotelList.css"

const HotelList = (props) => {
  const { hotels, setHotels } = useContext(HotelsContext);

  let navigate = useNavigate();

  useEffect(() => {
    // to fetch data

    const fetchData = async () => {
      const response = await HotelFinder.get("");
      setHotels(response.data.data.Hotels);
    };
    fetchData();
  },[]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await HotelFinder.delete(`/${id}`);
      setHotels(
        hotels.filter((hotel) => {
          return hotel.id !== id;
        })
      );
    } catch (error) {}
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/hotels/${id}/update`);
  };

  const handleHotelSelect = (id) => {
    navigate(`/hotels/${id}/`);
  };

  return (
    <div className="outer"><h1 id="heading">Hotels</h1>
    <div className="box row row-cols-1 row-cols-md-3 g-4">
      {hotels &&
        hotels.map((hotel) => {
          // hotels && {} means run this code only if hotels is not undefined

          return (
            
              <div className="col">
                <div className="card">
                  <img className="card-img-top" src="..." alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text">{hotel.location}</p>
                    <p className="card-text">{"$".repeat(hotel.price_range)}</p>
                    <p className="card-text">reviews</p>
                    <div>
                      <span>
                        <button onClick={ (e) =>handleUpdate(e,hotel.id) /*pass reference to function for onclick to work */ } className="btn btn-warning">
                          Update
                        </button>
                      </span>
                      <span>
                      <button onClick={(e) => handleDelete( e, hotel.id ) /*pass reference to function for onclick to work */ } className="btn btn-danger">
                          Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
          );
        })}
      </div>
      </div>
    
  );
};

export default HotelList;
