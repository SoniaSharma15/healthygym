import React from 'react'
import Slider from './Carousel/Slider'
import Container from './Container'
function Home() {
  return (<>
    <Slider></Slider>
    <h1 className='text-center text-danger p-2'>WELCOME TO THE HEALTHY-GYM </h1>
    <h3 className='text-center'>Take care of your body. It's the only place you have to live.</h3>
    <Container/>

  </>
  )
}

export default Home