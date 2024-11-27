import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RES_CARD_IMAGE_URL } from "../utils/constant";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { removeItem } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { calculateTotal } from "../redux/slices/cartSlice";
import { clearCartItem } from "../redux/slices/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const total = useSelector((state) => state.cart.total);
  

  const dispatch = useDispatch();

  const handlePlus = (id) => {
    dispatch(increaseQuantity(id));
    dispatch(calculateTotal());
  };
  const handleMinus = (id) => {
    dispatch(decreaseQuantity(id));
    dispatch(calculateTotal());
  };

  const clearCart = () => {
    dispatch(clearCartItem());
    dispatch(calculateTotal());
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-xl font-semibold">Cart is Empty!</h1>
        <Link to={"/"}>
          {" "}
          <button className="mt-4 px-3 py-1 bg-green-600 rounded text-white">
            Order Now
          </button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="px-4 py-8 h-[60vh] overflow-y-auto mt-4  w-[60%] mx-auto  ">
        {cartItems.map((item) => (
          <div
            key={item.card.info.id}
            className="flex items-center mt-4 gap-4 border w-[90%] shadow rounded mx-auto pr-8"
          >
            <div>
              <img
                className="w-[70px] object-cover"
                src={`${RES_CARD_IMAGE_URL}${item.card.info.imageId}`}
              />
            </div>
            <div className="flex-1">{item.card.info.name}</div>
            <div className="flex items-center border">
              <span
                className="px-2 py-1 cursor-pointer"
                onClick={() => handleMinus(item.card.info.id)}
              >
                <FiMinus />
              </span>
              <span className="px-2 py-1 ">{item.quantity}</span>
              <span
                className="px-2 py-1 cursor-pointer"
                onClick={() => handlePlus(item.card.info.id)}
              >
                <FaPlus />
              </span>
            </div>
            <div>
              ₹{" "}
              {(item?.card?.info?.price * item.quantity) / 100 ||
                (item?.card?.info?.defaultPrice * item.quantity) / 100}{" "}
            </div>
            <div
              className="text-red-700  cursor-pointer"
              onClick={() => dispatch(removeItem(item.card.info.id))}
            >
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
      <div className="w-[50%] mx-auto flex gap-4 items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg">Total :</h1>
          <p> ₹ {total}</p>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-red-700 text-white rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
