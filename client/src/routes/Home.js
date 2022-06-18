import React from "react";
import "./home.css"
import Header from "../components/Header";
import AddHotel from "../components/AddHotel";
import HotelList from "../components/HotelList";

export const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="addHotel container">
        <AddHotel />
      </div>
      <div>
        <HotelList />
      </div>
    </>
  );
};
