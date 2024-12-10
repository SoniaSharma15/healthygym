import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/fire/Signup.jsx";
import Login from "./components/fire/login.jsx";
import { auth } from "./components/fire/firebase.js";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Adminlogin from "./components/admin/Adminlogin.jsx";
import Admin from "./components/admin/admin.jsx";
import Member from "./components/Member/Member.jsx";
import Invoice from "./components/Member/Invoice.jsx";
import "./App.css";
import "./index.css";
import Nutrition from "./components/Member/Nutrition.jsx";
import Cardcontainer from "./components/Supplements/Cardcontainer.jsx";
import PersonalDetails from "./components/Member/PersonalDetails.jsx";

function App() {
  const [page, setPage] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  // Create a new Date object
  let currentDate = new Date();
  // Get the current month and pad with leading zero if necessary
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  // Get the current year
  let year = currentDate.getFullYear();
  // Combine year and month in the desired format
  let formattedDate = `${year}-${month}`;

  const [moninvoice, setMonInvoice] = useState(formattedDate);

  const [usermonth, setUsermonth] = useState(formattedDate);

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path={"/member"}
          element={
            <Member moninvoice={moninvoice} setUsermonth={setUsermonth} />
          }
        />
        <Route
          path={"/"}
          element={user ? <Navigate to="/member" /> : <Login />}
        />
        <Route path="/supplements" element={<Cardcontainer />} />
        <Route path={"/nutrition"} element={<Nutrition />} />
        <Route
          path={"/personaldetails"}
          element={<PersonalDetails setPage={setPage} usermonth={usermonth} />}
        />
        <Route path={"/signup"} element={<Signup />} />
        <Route
          path={"/invoice"}
          element={<Invoice setPage={setPage} usermonth={usermonth} />}
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/admindashboard"
          element={
            <>
              <AdminDashboard />
            </>
          }
        />
        <Route
          path="/adminlogin"
          element={
            <>
              <Adminlogin setMonInvoice={setMonInvoice} />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Admin moninvoice={moninvoice} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
