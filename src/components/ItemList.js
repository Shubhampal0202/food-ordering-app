import React from "react";
import { RES_CARD_IMAGE_URL } from "../utils/constant";
import { addItem } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { calculateTotal } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function ItemList({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user.userDetails);

  const handleAddItem = (item) => {
    if (!userDetails) {
      toast.error("Login First");
      navigate("/signin");
      return;
    }
    dispatch(addItem({ ...item, quantity: 1 }));
    dispatch(calculateTotal());
  };

  return (
    <div>
      {data.itemCards.map((item) => (
        <div key={item.card.info.id}>
          <div className="mt-4 flex justify-between items-center px-2">
            <div className="w-[80%]">
              <h2 className="font-semibold">{item.card.info.name}</h2>
              <p className="font-medium">₹ {item.card.info.price / 100}</p>
              <div className="text-gray-500">{item.card.info.description}</div>
            </div>
            <div className="w-[20%] relative">
              <img
                className="w-full rounded-md"
                src={RES_CARD_IMAGE_URL + item.card.info.imageId}
                alt="pic"
              />
              <div className="text-center flex justify-center absolute top-0 border-3 border-white w-full">
                <button
                  onClick={() => handleAddItem(item)}
                  className="bg-black text-white rounded flex justify-center items-center px-2 py-1"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
          <hr className="mt-6" />
        </div>
      ))}
    </div>
  );
}

export default ItemList;
