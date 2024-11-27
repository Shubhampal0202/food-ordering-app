import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { RESTAURANT_MENU_API } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCatagory from "./RestaurantCatagory";

function RestaurantMenu() {
  const params = useParams();
  const { resId } = params;
  const resInfo = useRestaurantMenu(resId);
  const [indexItem, setIndexItem] = useState(null);

  if (!resInfo) return <Shimmer />;
  const { name, cuisines, avgRating, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const catagoryMenuData =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (item) =>
        item.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[60%]">
        <h1 className="font-bold text-center text-2xl">{name}</h1>
        <div className="flex justify-center font-semibold mt-2">
          <div>
            {cuisines.join(", ")}
            {"-"}
          </div>
          <div>{costForTwoMessage}</div>
        </div>

        <div className="mt-6">
          {catagoryMenuData.map((item, index) => (
            <RestaurantCatagory
              data={item.card.card}
              key={item.card.card.title}
              showMenu={index === indexItem ? true : false}
              setIndexItem={setIndexItem}
              indexItem={indexItem}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
