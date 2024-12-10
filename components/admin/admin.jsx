import React, { useState, useEffect } from "react";
import { dbadmin } from "../fire/firebase";
import { useNavigate } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { ToastContainer,toast } from "react-toastify";
function Admin({ moninvoice }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [avai, setAvai] = useState("true");

  const islogin = localStorage.getItem("isLoggedIn");
  const user = ref(dbadmin, moninvoice);
  if (islogin === "false") {
    navigate("/adminlogin");
  }

  const logout = () => {
    toast.info("Admin Logout Successfully");
    localStorage.setItem("isLoggedIn", "false");
    setTimeout(() => {
      navigate("/adminlogin");
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      fech();
    });
  }, []);

  const fech = async () => {
    const snap = await get(user);

    if (snap.exists()) {
      const myData = snap.val();
      const idArray = Object.keys(myData).map((itmid) => {
        return {
          ...myData[itmid],
          itemid: itmid,
        };
      });
      // setData(Object.values(snap.val()));
      setData(idArray);
    } else {
      setAvai("false");
    }
  };

  return (
    <>
    <ToastContainer/>
      <h1 className="container my-3 text-center">Welcome to Admin Panel</h1>
      <div className="box d-flex justify-content-evenly">
        <button
          className=" my-2 mx-3  bg-warning text-danger fw-medium"
          onClick={fech}
        >
          Refresh
        </button>
        <button
          className=" my-2 mx-3  bg-warning text-danger fw-medium"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className=" my-2 mx-3  bg-warning text-danger fw-medium"
          onClick={() => {
            navigate("/admindashboard");
          }}
        >
          Add Member
        </button>
      </div>

      {avai === "true" ? (
        <>
          <table className="w-100 table table-sm table-striped table-info table-hover table-bordered">
            <thead className="bg-info">
              <tr className="">
                <th className="d-flex justify-content-center bg-info">Email</th>
                <th className="bg-info">Member Id</th>
                <th className="bg-info">Name</th>
                <th className="bg-info">Address</th>
                <th className="bg-info">ItemPrice</th>
                <th className="bg-info">ItemDesciption</th>
                <th className="bg-info">Mobile</th>
                <th className="bg-info">BloodGP</th>
                <th className="bg-info">Month</th>
                <th className="bg-info">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                return (
                  <tr>
                    <td>{user.email}</td>
                    <td> {user.itemid} </td>
                    <td> {user.name} </td>
                    <td> {user.address} </td>
                    <td> {user.itemprice} </td>
                    <td> {user.itemdesc} </td>
                    <td> {user.mob} </td>
                    <td> {user.bloodgp} </td>
                    <td> {user.invoicemonth} </td>
                    <td> {user.invoiceTime} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
        </>
      ) : (
        <div className="container my-5">
          <h1 className="text-center text-danger fs-italic">
            No Invoice Is Present For this Month
          </h1>
          {/* <h2 className='text-center text-warning fs-italic'>Kindly Submit Fees for this Month </h2>
<h3 className='text-center text-danger fs-italic'>If already then contact your Gym trainee </h3> */}
        </div>
      )}
    </>
  );
}

export default Admin;
