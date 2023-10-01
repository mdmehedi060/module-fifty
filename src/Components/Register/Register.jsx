import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const [registerError, setregisterError] = useState("");
  const [success, setsuccess] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log('from submitting');
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);

    // reset error
    setregisterError("");
    setsuccess("");

    if (password.length < 6) {
      setregisterError("Password should be at least 6 characters ");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setregisterError(
        "Your password should have at least one charecter uppercase"
      );
      return;
    } else if (!accepted) {
      setregisterError("Please accepted our termas & conditions");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setsuccess("User created successfully");
      })
      .catch((error) => {
        console.error(error);
        setregisterError(error.message);
      });
  };

  return (
    <div className="text-center">
      <div className="mx-auto md:w-full">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 border w-full py-2 px-4"
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <br />
          <div className="relative mb-4 ">
            <input
              className="mb-4 border w-full py-2 px-4"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <br />
          <div className="mb-4">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terns">
              Accept our <a href="">Terms & conditions</a>
            </label>
          </div>
          <br />

          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            name="submit"
            value="Register"
            required
          />
        </form>
        {registerError && <p className="text-red-500">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>Already have an account? Please <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
