import React from 'react'
import Card from './Card'
import Carddata from './Carddata'
function cdata(value) {
    return <Card
    key={value.id}
    supp_Name={value.supp_Name}
        img={value.img}
    />
   }
function Cardcontainer() {

  return (
<>
<div className="album py-3">
  <h1 className='text-warning my-3 text-center'>Supplements</h1>
    <div className="container">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
     {Carddata.map(cdata)}
        </div>
    </div>
  </div>
</>  )
}

export default Cardcontainer