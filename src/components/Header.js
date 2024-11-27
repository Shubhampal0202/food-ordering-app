import { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import { MdGppGood } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useOnlineOfflineStatus } from "../utils/useOnlineOfflineStatus";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const onlineStatus = useOnlineOfflineStatus();
  const cartItems = useSelector((state) => state.cart.cartItem);
  const userDetails = useSelector((state) => state.user.userDetails);

  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {});
  };
  return (
    <div className="flex justify-between items-center border">
      <div className="logo-container">
        <img className="w-24 cursor-pointer" src={LOGO_URL} />
      </div>

      <div className="flex items-center mr-8 px-6">
        <div className="flex items-center">
          <span> Online Status: </span>
          {onlineStatus ? (
            <MdGppGood className="text-green-700 mt-1" />
          ) : (
            <GrStatusGoodSmall className="text-red-800 mt-1" />
          )}
        </div>
        <div className="hover:text-green-300 transition duration-300 ease-linear hover:cursor-pointer   ml-4 py-2 px-3 rounded-lg">
          <Link to={"/"}>Home</Link>
        </div>

        <div className="hover:text-green-300 transition duration-300 ease-linear hover:cursor-pointer ml-4 py-2 px-3 rounded-lg">
          <Link to={"/cart"} className="flex items-center">
            <FaShoppingCart className="text-lg" />
            <span className="mb-2">({cartItems.length})</span>
          </Link>
        </div>
        <div className="hover:text-green-300 transition duration-300 ease-linear hover:cursor-pointer ml-4 rounded-lg ">
          {userDetails ? (
            <button onClick={handleSignout}>
              <Link className="px-2 py-1 bg-green-600 rounded text-white cursor-pointer">
                SignOut
              </Link>
            </button>
          ) : (
            <button>
              <Link
                to={"/signup"}
                className="px-2 py-1 bg-green-600 rounded text-white cursor-pointer"
              >
                Signup
              </Link>
            </button>
          )}
        </div>
        {userDetails && (
          <div className="ml-4 flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="w-[40px] rounded-full"
            />
            <p>({userDetails.displayName})</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
