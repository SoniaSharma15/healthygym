import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useRef } from "react";
import { auth } from "./firebase";
import { setDoc,doc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
function Signup() {
  const emailRef = useRef(null);
  const fnameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate=useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      fname: fnameRef.current.value,
    };
    const{email,password,fname}=formData;
   try{
    await createUserWithEmailAndPassword(auth,email,password);
    const user=auth.currentUser;
    if(user){
      await setDoc(doc(db,"Users",user.uid),{
        email:user.email,
        Fname:fname,
        photo:""
      })
      //storing session in localstorage
       localStorage.setItem('isUserLoggedIn', 'true');
    }
     emailRef.current.value=""
       passwordRef.current.value=""
       fnameRef.current.value=""
       toast.success("User Registered Successfully!!");
       setTimeout(() => {
         navigate("/login");
       }, 1000);   }catch(error){
        toast.error(error.message)
      }
};
// sign in with google
function googleprovider(){
  const provider=new GoogleAuthProvider();
  signInWithPopup(auth,provider).then(async(result)=>{
    const user=result.user;
   if(result.user){
       await setDoc(doc(db,"Users",user.uid),{
         email:user.email,
         Fname:user.displayName,
         photo:user.photoURL
       })
       //storing session in localstorage
      localStorage.setItem('isUserLoggedIn', 'true');
      setTimeout(() => {
        navigate("/member");
      }, 1000);
   }
  })
}
  return (
    <>    <ToastContainer/>

      <h1 className="text-center fw-bold my-4">Sign Up Now </h1>
      <center>
        <form
          onSubmit={handleSubmit}
          className="border border-2 border-info  w-75 py-4 mb-4 ronded"
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

          <div className="d-flex flex-column mb-3">
            <label className="mb-1 fw-bold mx-3" htmlFor="password">
              Password:
            </label>
            <input
              required
              className="input-field mx-auto"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password here"
              ref={passwordRef}
            />
            <small>Password Length must greater than 6 characters</small>
          </div>
          <div className="d-flex flex-column ">
            <label className="mb-1 fw-bold mx-3" htmlFor="fname">
              User Name:
            </label>
            <input
              required
              className="input-field mb-3  mx-auto"
              type="text"
              name="text"
              id="text"
              ref={fnameRef}
              placeholder="Enter Name here"
            />
          </div>
          <center>
            <button type="submit" className="fw-bold">
              Submit
            </button>
          </center>
        </form>
        <span>If Already Registered </span><a className="my-3" onClick={()=>{navigate("/login")
}}>Login Now</a>
       <hr />
       <button className="bg-info" onClick={googleprovider}>Sign in with Google</button>
      </center>
    </>
  );
}

export default Signup;
