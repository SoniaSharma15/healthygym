import React from 'react'
import  './Sliderdata'
function CarouselCard(props) {
  return (
    <>
    <div className="carousel-item " data-bs-interval="2000">
      <img src={props.img} className="d-block w-100 " alt={props.alt} />
    <div className="carousel-caption d-none d-md-block light-white text-dark">
        <h5>{props.heading}</h5>
        <h1>{props.data}</h1>
      </div>
    </div>
    </>
  )
}

export default CarouselCard