import { RES_CARD_IMAGE_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resObj } = props;

  const { name, costForTwo, cuisines, avgRating, sla, id } = resObj?.info;

  return (
    <div className="w-[250px] h-full border shadow rounded flex flex-col">
      <img
        className="w-full h-[180px] rounded"
        src={RES_CARD_IMAGE_URL + resObj.info.cloudinaryImageId}
      />
      <div className="p-2 flex flex-col grow gap-1">
        <h3>{name}</h3>
        <h4 className="grow">{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{costForTwo}</h4>
      </div>
    </div>
  );
};
export default RestaurantCard;

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative h-full">
        <label className="absolute -left-2 bg-green-500 text-white px-2 rounded-l-lg">
          Veg
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
