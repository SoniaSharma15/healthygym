import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
function Adminlogin({setMonInvoice}) {
    let his=useNavigate();
    const[pass,setPass]=useState("");
    const[month,setMonth]=useState("");
    const submitb=(e)=>{
        e.preventDefault();
        if(pass==="12345"){
          toast.success("Admin Login Successfully")
          localStorage.setItem('isLoggedIn', 'true');
          setTimeout(() => {   
             his("/admin")
          }, 1000);   }   

        else{
    toast.error("Enter valid Password")
        }
         
    }

    const postsetdata=async(e)=>{
        let value=e.target.value
        setPass(value);
    };
    const postsetdatamonth=async(e)=>{
        let value=e.target.value
        setMonth(value);
        setMonInvoice(value)
    };
  return (
    <>    <ToastContainer/>

    <h2 className=
    "container my-3">Welcome to Adminlogin page</h2>
    <form action="admin.jsx" method="post" className='container w-75 mx-auto'>
    <label htmlFor="password" className='text-warning my-2 fs-5 text-center'> Enter Detail</label>
    <input
            value={pass}
            onChange={postsetdata}
            name="email"
            type="password"
            placeholder='Enter password'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            // minLength={10}
            autoComplete="off"
            />
      
    <label htmlFor="month" className='text-warning my-2 fs-5 text-center'> Enter Month name</label>
    <input
            value={month}
            onChange={postsetdatamonth}
            name="month"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder='Enter Month Name'
            // minLength={10}
            autoComplete="off"
            />
      
      <button className='my-4 rounded' onClick={submitb}>submit</button>
      </form>
    </>
  )
}

export default Adminlogin;