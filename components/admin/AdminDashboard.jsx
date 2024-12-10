import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function AdminDashboard() {
  const navigate=useNavigate();


  const islogin=localStorage.getItem('isLoggedIn');

  if(islogin==='false'){
    navigate("/adminlogin")
  }

  const logout=()=>{
    toast.error("User Logout Successfully")
    localStorage.setItem('isLoggedIn', 'false');
    setTimeout(() => {    navigate("/adminlogin")
    }, 1000);   }


  const nameRef=useRef(null);
  const emailRef = useRef(null);
  const mobRef=useRef(null);
  const bloodgpRef=useRef(null);
  const addressRef=useRef(null);
  const itemdescRef=useRef(null);
  const  itempriceRef=useRef(null);
  const invoicemonthRef=useRef(null);
  const  invoiceTimeRef=useRef(null)

const HandleSubmit=async(e)=>{
e.preventDefault();
const formData = {
  name:nameRef.current.value,
  email: emailRef.current.value,
  mob:mobRef.current.value,
  bloodgp:bloodgpRef.current.value,
  address:addressRef.current.value,
  itemdesc:itemdescRef.current.value,
  itemprice:itempriceRef.current.value,
  invoicemonth:invoicemonthRef.current.value,
  invoiceTime:invoicemonthRef.current.value
};
const{email,name,mob,bloodgp,address,itemdesc,itemprice,invoicemonth, invoiceTime}=formData;

const res= await fetch (`https://healthygym2024-default-rtdb.asia-southeast1.firebasedatabase.app/${invoicemonth}.json`,
  {
  method:"POST",
  headers:{
      "Content-Type":"application/json",
  },
  body:JSON.stringify({
    email,name,mob,bloodgp,address,itemdesc,itemprice,invoicemonth, invoiceTime
  }),
}
 );
if(res){
  toast.success("User Inserted Successfully!!")
  nameRef.current.value=""
   emailRef.current.value=""
  mobRef.current.value=""
  bloodgpRef.current.value=""
  addressRef.current.value=""
  itemdescRef.current.value=""
  itempriceRef.current.value=""
  invoicemonthRef.current.value=""
  invoiceTimeRef.current.value=""
}
else{
  toast.error("Data Not Inserted Successfully")
}
}
  return (<>
<ToastContainer/>
    <div className="box d-flex justify-content-evenly">
      <button className=' my-2 mx-3 bg-warning text-danger fw-medium' onClick={logout}>Admin Logout</button>
      <button  className=' my-2 mx-3  bg-warning text-danger fw-medium' onClick={()=>{navigate("/admin")}}> Admin View</button>
      </div>
      
      <form id="container" className='text-center w-75 m-auto bg-dark text-light p-5 border rounded ' onSubmit={HandleSubmit}>

<div className="d-flex flex-column member">
  <label htmlFor="member">
    Member Name
  </label>
  <input className='text-danger' ref={nameRef} type="text" placeholder="Enter Member's Name here" />
</div>
<div className="d-flex flex-column email">
  <label htmlFor="email">
    Email
  </label>
  <input className='text-danger' ref={emailRef} type="email" placeholder="Enter email here" />
</div>
<div className="d-flex flex-column number">
  <label htmlFor="number">
Contact Number  </label>
  <input  ref={mobRef} className='text-danger'type="number" placeholder="Enter Contact Number here" />
</div>
<div className="d-flex flex-column Bg">
  <label htmlFor="Bg">
Blood Group  </label>
  <input className='text-danger' ref={bloodgpRef} type="text" placeholder="Enter Blood Group here" />
</div>
<div className="d-flex flex-column Address">
  <label htmlFor="Address">
    Address 
  </label>
  <input className='text-danger' ref={addressRef} type="text" placeholder="Enter Address here" />
</div>
<div className="d-flex flex-column ItemDescription">
  <label htmlFor="ItemDescription">
    Item Description 
  </label>
  <input className='text-danger' ref={itemdescRef} type="text" placeholder="Enter  All Item Description Separated with comma " />
</div>
<div className="d-flex flex-column price">
  <label htmlFor="price">
Price 
 </label>
  <input className='text-danger'  ref={itempriceRef} type="text" placeholder="Enter Price Of all Item Separated with comma" />
</div>
<div className="d-flex flex-column invoice">
  <label htmlFor="price">
Invoice Month 
 </label>
  <input className='text-danger'  ref={invoicemonthRef} type="month" placeholder="Enter Invoice Month " />
</div>
<div className="d-flex flex-column invoice">
  <label htmlFor="price">
Invoice Created On 
 </label>
  <input className='text-danger'  ref={ invoiceTimeRef} type="time" placeholder="Enter Invoice Created On " />
</div>

<button   type='submit' className="bg-secondary my-4">Submit</button>

</form>
</>
  )
}

export default AdminDashboard