import React from 'react'
import Sliderdata from './Sliderdata'
import CarouselCard from './CarouselCard'

function cdata(val){
  return <CarouselCard
  key={val.id}
  img={val.img}
  />
}


function Slider() {
  return (
    <>
    <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade " data-bs-ride="carousel">
  <div className="carousel-inner">
  <div className="carousel-item active" data-bs-interval="1000">
      <img src="img/w1.jpg" className="d-block w-100 " alt="..." />
    </div>
   { Sliderdata.map(cdata)}
</div>
</div>
    </>
  )
}

export default Slider