import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "../utils/constant";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { createUser } from "../redux/slices/userAuthSlice";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please enter all the field ");
      return;
    }
    if (!validate(email)) {
      setError("Enter Email in given format");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            const { email, displayName } = auth.currentUser;
            dispatch(createUser({ email, displayName }));
            navigate("/");
          })
          .catch((error) => {});
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
        <h1 className="text-2xl font-semibold">Register</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full px-2 py-2 rounded outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Email ex: abc@test.com"
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
        {error && <p className="-mt-4 text-red-800 font-semibold">{error}</p>}
        <div>
          <button className="bg-green-600 px-2 py-1 hover:cursor-pointer rounded text-white">
            Register
          </button>
        </div>
        <div>
          Already Register please{" "}
          <Link to={"/signin"} className="text-blue-600 font-semibold">
            Login{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
