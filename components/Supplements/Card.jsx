import React from "react";

function Card(props) {
  return (
    <>
      <div className="col ">
        <div className="card border">
          <div className="imgnav border">
            <img src={`${props.img}`} alt={props.img} className="imgheigh" />
          </div>

          <div>
            <p className="text-center fw-bold mt-2">{props.supp_Name}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
