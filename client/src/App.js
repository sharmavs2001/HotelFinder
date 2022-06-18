import React from "react";
import "./styles.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { HoteldetailPage } from "./routes/HoteldetailPage";
import { UpdatePage } from "./routes/UpdatePage";
import { HotelsContextProvider } from "./context/HotelsContext";
const App = () => {
  return (
    <HotelsContextProvider>
    <>
      <BrowserRouter>
      <Routes>        
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/hotels/:id/update" element={<UpdatePage/>} />
          <Route exact path="/hotels/:id" element={<HoteldetailPage/>} />
      </Routes>
      </BrowserRouter>

    </>
    </HotelsContextProvider>
  );
};

export default App;
