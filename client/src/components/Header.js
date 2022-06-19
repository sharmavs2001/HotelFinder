import React from "react"; 
import "./header.css"
import one from "../images/1.jpg"
import two from "../images/2.jpg"
import three from "../images/3.jpg"
import logo from "../images/logo.png"


const Header = () => {
  return (
    <div >
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <a className="navbar-brand" href="#">
      <img src={logo} alt="" width="30" height="40"/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li key ="uid" className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li key ="uid1" className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li key ="uid2" className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li key ="uid3"><a className="dropdown-item" href="#">Action</a></li>
            <li key ="uid4"><a className="dropdown-item" href="#">Another action</a></li>
            <li key ="uid5"><hr className="dropdown-divider"/></li>
            <li key ="uid6"><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li key ="uid7" className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img alt="..." className="d-block w-100" src={one}/>
    </div>
    <div className="carousel-item">
      <img alt="..." className="d-block w-100" src={two}/>
    </div>
    <div className="carousel-item">
      <img alt="..." className="d-block w-100" src={three}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </div>
   
  )
};

export default Header;
