import React, { useEffect, useState } from "react";
import { auth, db } from "../fire/firebase";
import { doc, getDoc } from "firebase/firestore";
import { dbadmin } from "../fire/firebase";
import { ref, get } from "firebase/database";

function PersonalDetails({ setPage, usermonth }) {
   const [userDetails, setuserDetails] = useState(null);

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
    return (<>

    <h1 className="text-warning text-center my-2">Personal Details</h1>
    {filteredUsers.length!=0? (

       <div className="w-100 px-2 py-2 d-flex flex-column bg-dark  border rounded ">

       {filteredUsers.map((user, index) => {
         return (<>
         <div className="d-flex  flex-column text-center"  key={index}>
            <h2 className="text-warning"> Name : </h2><h2 className="text-light">{user.name}</h2>
        </div>
        <hr className="text-light"/>
         <div className="d-flex  flex-column text-center"  key={index}>
            <h2 className="text-warning"> Email : </h2><h2 className="text-light">{user.email}</h2>
        </div>
        <hr className="text-light"/>
         <div className="d-flex  flex-column text-center"  key={index}>
            <h2 className="text-warning"> Mobile Number : </h2><h2 className="text-light">{user.mob}</h2>
        </div>
        <hr className="text-light"/>
         <div className="d-flex  flex-column text-center"  key={index}>
            <h2 className="text-warning"> Blood Group : </h2><h2 className="text-light">{user.bloodgp}</h2>
        </div>
        <hr className="text-light"/>
         <div className="d-flex  flex-column text-center"  key={index}>
            <h2 className="text-warning"> Address : </h2><h2 className="text-light">{user.address}</h2>
        </div>
        <hr className="text-light"/>
        </>
        )
       })}
         </div>
  ):<>
  <h1 className="p-3 text-center text-danger">
    No Personal Records are Available here.... 
    </h1>
    <h2 className="px-3 text-center py-2 text-danger">
    
    You are not enrolled by Gym Manager.... 
    </h2></>}
  </>
)
        
}

export default PersonalDetails