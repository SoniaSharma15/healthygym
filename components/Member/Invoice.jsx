import React, { useEffect, useState } from "react";
import { auth, db } from "../fire/firebase";
import { doc, getDoc } from "firebase/firestore";
import { dbadmin } from "../fire/firebase";
import { ref, get } from "firebase/database";
import "./Invoice.css";

function Invoice({ setPage, usermonth }) {
  const [userDetails, setuserDetails] = useState(null);
  function productOfStringArray(arr) {
    // Convert strings to numbers and calculate the product
    return arr.reduce((product, num) => product + parseFloat(num), 1);
  }

  const fetchuserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docref = doc(db, "Users", user.uid);
      const docsnap = await getDoc(docref);
      if (docsnap.exists()) {
        setuserDetails(docsnap.data());
      } else {
        console.log("user is not loggged in");
      }
    });
  };
  const [data, setData] = useState([]);

  const databaseuser = ref(dbadmin, usermonth);

  const fech = async () => {
    const snap = await get(databaseuser);
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
    }
  };
  const emailToCheck = userDetails ? userDetails.email : "Not Available";

  const filteredUsers = data.filter((item) => {
    const itemEmail = item.email.trim().toLowerCase(); // Trim and normalize case
    const emailToCheckNormalized = emailToCheck.trim().toLowerCase();
    if (itemEmail === emailToCheckNormalized) {
      return item;
    }
  });

  useEffect(() => {
    fetchuserData();
    setTimeout(() => {
      fech();
    });
  }, []);
  const PrintComponent = () => {
    const pdfid = document.getElementById("pdf");
    pdfid.style.display = "none";
    setPage(true);
  };

  return (
    <>
      {filteredUsers.length != 0 ? (
        <>
          <button onClick={PrintComponent} id="pdf">
            Download PDF
          </button>
          <div className=" my-3 py-2">
            {filteredUsers.map((user, index) => {
              // key = { index };
              const itemdescarr = user.itemdesc.split(",");
              const itempricearr = user.itemprice.split(",");
              const itemsarray = {
                itemdesc: itemdescarr,
                itemprice: itempricearr,
              };
              let product = productOfStringArray(itempricearr);

              // Item iteration
              const rows = itemsarray.itemdesc.map((desc, index) => (
                <tr key={index} className="border">
                  <td>{desc}</td>
                  <td>{itemsarray.itemprice[index]}</td>
                </tr>
              ));

              // Input date string
              const dateString = user.invoicemonth;
              // Create a new Date object from the string
              const date = new Date(dateString);
              // Define an array of month names
              const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              // Get the month name and year
              const month = monthNames[date.getMonth()];
              const year = date.getFullYear();
              // Combine them into the desired format
              const formattedDate = `${month} ${year}`;

              return (
                <>
                  <h1 className="text-center bg-warning p-2 mb-2">
                    Healthy Gym
                  </h1>
                  <div className="container-fluid main">
                    <div className="left">
                      <h3>Invoice To:</h3>
                      <p>{user.name}</p>
                      <p>{user.address}</p>
                      <p>India</p>
                    </div>
                    <div className="right">
                      <span>Date:</span> <span>{user.invoiceTime}</span>
                    </div>
                  </div>
                  <h1 className="text-center">{formattedDate}</h1>
                  <div className="d-flex justify-content-center">
                    <table className="border border-3 p-3 table table-info table-striped table-sm w-50">
                      <thead className="border">
                        <th>ITEM/DESCRIPTION</th>
                        <th>PRICE</th>
                      </thead>
                      <tbody>
                        {/* <tr className="border ">
                      <td>{user.itemdesc}</td>
                      <td>{user.itemprice}</td>
                    </tr> */}
                        {rows}
                      </tbody>
                    </table>
                  </div>
                  <div className="container my-3 py-2 text-center">
                    <h6>Total Price : {product - 1}</h6>
                    <h6>Blood Group : {user.bloodgp}</h6>
                    <h6>Email : {user.email}</h6>
                    <h6> Contact Number : +91 {user.mob}</h6>
                  </div>
                  <footer className="main my-3 py-2">
                    <div className="left">
                      <h4>Terms and Condition</h4>
                      <small>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Dolorem, neque esse. Sed assumenda quaerat atque
                        minima, velit sint autem sit!
                      </small>
                    </div>
                    <div className="right ">
                      <h5>Authorized Sign</h5>
                      <img src="img/signature1.jpg" alt="sign" />
                    </div>
                  </footer>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className="text-center text-danger py-4">
            No Invoice is generated yet !...
          </h1>
        </>
      )}
    </>
  );
}

export default Invoice;
