import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelFinder from "../apis/HotelFinder";
import AddReviews from "../components/AddReviews";
import Reviews from "../components/Reviews";
import { HotelsContext } from "../context/HotelsContext";

export const HoteldetailPage = () => {
  const { id } = useParams();
  const { selectedHotel, setSelectedHotel } = useContext(HotelsContext);

  useEffect(() => {
    // to fetch data

    const fetchData = async () => {
      const response = await HotelFinder.get(`/${id}`);
      console.log(response.data.data);
         setSelectedHotel(response.data.data);
         
        };
    fetchData();
  });
  
 
  return (
    <div>
      {selectedHotel && (
        <>
          <div className="mt-3">
          
          </div>
        
          <AddReviews/>
        </>
      )}
    </div>
  );
};
