import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState,useRef } from 'react';
import { Link } from "react-router-dom";



const Login = () => {
  const [registerError, setregisterError] = useState("");
  const [success, setsuccess] = useState("");
const emailRef= useRef(null);

const handlelogin = e =>{
  e.preventDefault();
  const email= e.target.email.value;
  const password =e.target.password.value;
  console.log(email, password);

    // reset error
    setregisterError("");
    setsuccess("");

  // add velidation
   signInWithEmailAndPassword(auth, email, password)
   .then((result) => {
    console.log(result.user);
   
    if(result.user.emailVerified){
      setsuccess("User login successfully");
    }
    else{
      alert('Please verified your email address')
    }
// send email verification
sendEmailVerification(result.user)
.then(()=>{
 alert('Please check your email & verifide your account')
})



  })
  .catch((error) => {
    console.error(error);
    setregisterError(error.message);
  });
}
const handleForgatePassword = () =>{
const  email=emailRef.current.value;
if(!email){
  console.log('sent reset email',emailRef.current.value);
  return;
}
else if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
console.log('plaese write valid email');
return;
}
// send validation email
sendPasswordResetEmail(auth, email)
.then(()=>{
  alert('please check your email')
})
  .catch(error=>{
    console.log(error);
  })
};

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
        <form onSubmit={handlelogin}>
        <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                name="email"
                ref={emailRef}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" onClick={handleForgatePassword} className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
        </form>
        {registerError && <p className="text-red-500">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>New to this website? Please <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
