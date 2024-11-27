import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import ItemList from "./ItemList";

function RestaurantCatagory({
  data,
  showMenu,
  setIndexItem,
  indexItem,
  index,
}) {


  const handleClick = (index) => {
    if (indexItem === index) {
      setIndexItem(null);
    } else {
      setIndexItem(index);
    }
  };

  return (
    <div>
      <div
        className="flex justify-between items-center mt-8 bg-gray-100 rounded p-2 cursor-pointer"
        onClick={() => handleClick(index)}
      >
        <h2 className="font-bold text-xl">
          {data.title} ({data.itemCards.length})
        </h2>
        <MdKeyboardArrowDown className="text-3xl" />
      </div>
      {showMenu && <ItemList data={data} />}
    </div>
  );
}

export default RestaurantCatagory;
