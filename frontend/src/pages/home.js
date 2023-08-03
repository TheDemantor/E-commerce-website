import { Link } from "react-router-dom";
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { AppContext } from "./context/productContext";
// import { useProductContext as UPX} from "./context/productContext";

export default function home() {
  
  // const { key } = Uc(AppContext);
  // const { key } =UPX();

  return (
    <div className="home">
      {/* <Container>
              {key} 
               {/* un commenting line 10 and this u will see that we can access the value passed as value from app provider */}
      {/* </Container> */}
      <Carousel autoFocus autoPlay infiniteLoop interval={3000} centerMode centerSlidePercentage={80} dynamicHeight useKeyboardArrows>
                <div>
                    <img src="images/SMbanners/1.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/8.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/6.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/5.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/4.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/7.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/2.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/SMbanners/3.png" alt="banner"/>
                </div>
            </Carousel>

      {/* CATEGORIES */}
      <img className="w-100" src="images/Line-Design.svg" alt="divider"></img>

      <div className="categories">
        <ul>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items/ctg/men">

                <img src="images/categories/1.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items/ctg/women">

                <img src="images/categories/2.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items/ctg/kids">

                <img src="images/categories/3.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items/ctg/women">

                <img src="images/categories/4.png" className="card-img-top" alt="..."></img>
                {/* <div className="card-body"> */}
                {/* <p className="card-text"></p> */}
                {/* </div> */}
              </Link>
            </div>
          </li>
          <li className="catCards">
            <div className="card" style={{ width: "18rem" }}>
              <Link className="ft-cl-it" to="/items/ctg/men">

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

      <img className="w-100" src="images/Line-Design.svg" alt="divider"></img>

      
      {/* FESTIVAL BANNERS */}

      <div id="carouselHome2" className="carousel slide my-10" data-bs-ride="carousel">
        <Carousel id="carouseHome2" className="my-10" autoFocus autoPlay infiniteLoop interval={3000} dynamicHeight useKeyboardArrows>
                <div>
                    <img src="images/LGbanners/1.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/LGbanners/2.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/LGbanners/3.png" alt="banner"/>
                </div>
                <div>
                    <img src="images/LGbanners/4.png" alt="banner"/>
                </div>
                {/* <div>
                    <img src="images/SMbanners/4.png" />
                </div>
                <div>
                    <img src="images/SMbanners/7.png" />
                </div>
                <div>
                    <img src="images/SMbanners/2.png" />
                </div>
                <div>
                    <img src="images/SMbanners/3.png" />
                </div> */}
            </Carousel>
      </div>

    </div>
  )
}
