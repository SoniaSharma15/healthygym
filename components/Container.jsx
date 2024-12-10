import React from 'react'

function Container() {
  return (<>
    <div className="container-fluid py-3">
    <div className="row py-1">
        <div className="col-sm-4 ma">
            <h4 className="text-center">KICK BOXING</h4>
            <img src="img/the-gym-kikboxing.jpg" alt=""width="100%"/>
            
        </div>
        <div className="col-sm-4 ma">
            <h4 className="text-center">AEROBCS</h4>
            <img src="img/the-gym-aerobic.jpg" alt=""width="100%"/>
            
        </div>
        <div className="col-sm-4 ma">
            <h4 className="text-center">STRENGTH</h4>
            <img src="img/the-gym-strength.jpg" alt=""width="100%"/>
            
        </div>
    </div>
    <div className="row">
        <div className="col-sm-4 ma"> 
            <img src="img/thegym-bhangrayour.jpg" alt=""width="100%"height="499"/>
        </div>
        <div className="col-sm-8 ma">
            <iframe width="100%" height="500" src="gym.mp4"allowFullScreen ></iframe>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-4 ma">
            <img src="img/the-gym-free-weight.jpg" alt=""width="100%"/>
            <h4 className="text-center">FREE WEIGHTS</h4>
        </div>
        <div className="col-sm-4 ma">
            <img src="img/the-gym-power-yoga.jpg" alt=""width="100%"/>
            <h4 className="text-center">POWER YOGA</h4>
        </div>
            <div className="col-sm-4 ma">
            <img src="img/the-gym-zumba.jpg" alt=""width="100%"/>
            <h4 className="text-center">ZUMBA</h4>
            </div>
            </div>
        </div></>  )
}

export default Container