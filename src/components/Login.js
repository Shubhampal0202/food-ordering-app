import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please Enter All fields");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <div className="flex  justify-center mt-10">
      <form
        className="border w-[300px] bg-gray-400 px-4 py-10 flex flex-col gap-4 rounded"
        onSubmit={submitForm}
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        <div>
          <input
            type="text"
            placeholder="Enter Email"
            className="w-full px-2 py-2 rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-2 py-2 rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 font-semibold -mt-2">{error}</p>}
        <div>
          <button className="bg-green-600 px-2 py-1 hover:cursor-pointer rounded text-white">
            Login
          </button>
        </div>
        <div>
          If Not Registered? please{" "}
          <Link to={"/signup"} className="text-blue-600 font-semibold">
            Register
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default Login;
