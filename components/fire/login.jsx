import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { auth } from "./firebase";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //storing session in localstorage
      localStorage.setItem("isUserLoggedIn", "true");

      toast.success("User Loginned Successfully!!");
      setTimeout(() => {
        navigate("/member");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // sign in with google
  function googleprovider() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;

      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Fname: user.displayName,
          photo: user.photoURL,
        });
        //storing session in localstorage
        localStorage.setItem("isUserLoggedIn", "true");
        toast.success("User Loginned Successfully!!");
        setTimeout(() => {
          navigate("/member");
        }, 1000);
      }
    });
  }

  return (
    <>
      <ToastContainer />
      <h1 className="text-center fw-bold my-4">Login Now </h1>
      <center>
        <form
          onSubmit={handleSubmit}
          className="border border-2 border-info  w-75 py-4 mb-4 rounded"
        >
          <div className="d-flex flex-column">
            <label className="mb-1 fw-bold mx-3" htmlFor="email">
              Email:
            </label>
            <input
              required
              className="input-field mb-3  mx-auto"
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="Enter Email here"
            />
          </div>

          <div className="d-flex flex-column ">
            <label className="mb-1 fw-bold mx-3" htmlFor="password">
              Password:
            </label>
            <input
              required
              className="input-field mb-3  mx-auto"
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter Password here"
            />
          </div>

          <button type="submit" className="fw-bold">
            Submit
          </button>
        </form>
        <center>
          <span>Not Registered ! </span>
          <a
            className="my-3"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register Now
          </a>
          <hr />
        </center>
        <button className="bg-info" onClick={googleprovider}>
          Sign in with Google
        </button>
      </center>
    </>
  );
}

export default login;
