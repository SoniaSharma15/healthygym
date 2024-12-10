import React, { useEffect, useState } from "react";
import { auth, db } from "../fire/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DietPlanTable from "./DietPlanTable";
import dietplan from "./DietPlan";


function Member({moninvoice,setUsermonth}) {
    const navigate=useNavigate()
 const isUserlogin=localStorage.getItem('isUserLoggedIn');
 if(isUserlogin==='false'){
  navigate("/login")  
  }
//rendering diet plan 
function cdata(val){
   return   <DietPlanTable
   key={val.id}
   breakfast={val.breakfast}
   lunch={val.lunch}
   preworkout={val.preworkout}
   dinner={val.dinner}
   day={val.day}
   invoiceTime={val.invoiceTime}
   />

}

//month data accessed to show invoice accordingly
const [month,setMonth]=useState(moninvoice)
const HandleSetMonth=(e)=>{
  e.preventDefault();
     const va=e.target.value;
     setMonth(va)
     setUsermonth(month)
}
// download invoice
function handleDownload(e){
  e.preventDefault();
navigate("/invoice")}


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


  // logout functionality
   async function handlelogout() {
    try {
      await auth.signOut();
      localStorage.setItem('isUserLoggedIn', 'false');
      navigate("/");
      console.log("user logged out succesfully");
    } catch (error) {
      console.log("error in logout" + error.message);
    }
  };
  useEffect(() => {
    fetchuserData();
  }, []);
  return (
    <> <div>
    {userDetails && (
      <> 
      <div className="d-flex justify-content-end">
      <button onClick={handlelogout} >Logout</button>
        </div>  
{/* DOwnolad Invoice of any month */}
        <div className="container my-3 p-3 text-center">
      <h2>
      Want to Download Your Gym Receipt : 
      </h2>
      <label htmlFor="month" className="fw-bold mx-2">Month:</label>
   <input type="month" name="month" placeholder="Enter Month " className="w-50" value={month} onChange={HandleSetMonth}
   />
   <button className="m-3 " onClick={handleDownload}>Download</button>
    </div>

{/* Dieting Plan */}
<h1 className="text-danger m-3">Hi  {userDetails.Fname}</h1> 
<h2 className="text-center">Here is your dieting plan :</h2> 
{dietplan.map(cdata)}
      </>
    )}
  </div> 
    
    </>
  )
}

export default Member