import { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useOnlineOfflineStatus } from "../utils/useOnlineOfflineStatus";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [filterRestaurantdata, setFilterRestaurantdata] = useState([]);
  const [searchText, setSearchText] = useState("");
  const VegRestaurantCard = withVegLabel(RestaurantCard);
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4072771&lng=81.8398558&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await res.json();

    setRestaurantData(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterRestaurantdata(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const handleSearch = () => {
  

    const newData = restaurantData.filter((item) => {
      return item.info.name.toLowerCase().includes(searchText.toLowerCase());
    });
    

    setFilterRestaurantdata(newData);
  };

  const status = useOnlineOfflineStatus();
  if (!status) {
    return (
      <h1>
        Looks like You are Offline!! Please Check Your Internet Connection.
      </h1>
    );
  }

  return restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="flex items-center my-5 mx-6">
        <div className="flex gap-4 mr-8 ">
          <div className="relative">
            <input
              className="px-3 py-2 rounded-sm outline-none border-[1px] border-slate-300"
              type="text"
              placeholder="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FaTimes
              className="absolute top-3 right-2"
              onClick={() => {
                setFilterRestaurantdata(restaurantData);
                setSearchText("");
              }}
            />
          </div>

          <button
            className="bg-green-500 text-white px-3 py-2 rounded-sm hover:bg-green-600 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="filter-box">
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-sm  hover:bg-green-600 transition-all"
            onClick={() => {
              const filterData = restaurantData.filter((item) => {
                return item.info.avgRating >= 4.2;
              });
              setFilterRestaurantdata(filterData);
            }}
          >
            TopRatedRestaurent
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 py-6">
        {filterRestaurantdata.length !== 0 ? (
          filterRestaurantdata.map((resObj) => (
            <Link key={resObj.info.id} to={`/restaurant/${resObj.info.id}`}>
              {resObj.info.veg ? (
                <VegRestaurantCard resObj={resObj} />
              ) : (
                <RestaurantCard resObj={resObj} />
              )}
            </Link>
          ))
        ) : (
          <h1 className="text-xl font-semibold">Result Not Found</h1>
        )}
      </div>
    </div>
  );
};
export default Body;
