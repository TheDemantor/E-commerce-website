import { Link } from "react-router-dom";
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function home() {
  return (
    <div className="home">

      <Carousel>
                <div>
                    <img src="images/SMbanners/1.png" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="images/SMbanners/2.png" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="images/SMbanners/3.png" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>

      {/* CATEGORIES */}
      <img className="w-100" src="images/Line-Design.svg" alt="divider-image"></img>

      <div className="categories">
        <ul>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/1.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/2.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/3.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/4.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/5.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items">

                <img src="images/categories/6.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <img className="w-100" src="images/Line-Design.svg" alt="divider-image"></img>

      
      {/* FESTIVAL BANNERS */}

      <div id="carouselExampleInterval2" className="carousel slide w-100 my-10" data-bs-ride="carousel">
        {/* <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div> */}
        <div className="carousel-inner">
          <div className="carousel-item" data-bs-interval="2000">
            <img src="images/LGbanners/2.png" className="d-block w-100" alt="."></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="images/LGbanners/3.png" className="d-block w-100" alt="."></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="images/LGbanners/4.png" className="d-block w-100" alt="."></img>
          </div>
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="images/LGbanners/1.png" className="d-block w-100" alt="."></img>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  )
}
