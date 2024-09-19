import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap, BsStar } from "react-icons/bs";
import { BiHotel, BiMoney } from "react-icons/bi";

function MyHotels() {
  const { showToast } = useAppContext();

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {
        showToast({ message: "Failed to fetch hotels", type: "ERROR" });
      },
    }
  );

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5 ">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 flex text-white font-bold text-xl p-2 hove:bg-blue-500 rounded-md"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line ">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 flex items-center rounded-sm p-3">
                <BsMap className="mr-1" />
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 flex items-center rounded-sm p-3">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 flex items-center rounded-sm p-3">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 flex items-center rounded-sm p-3">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} child
              </div>
              <div className="border border-slate-300 flex items-center rounded-sm p-3">
                <BsStar className="mr-1" />
                {hotel.starRating} start rating
              </div>
            </div>

            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 flex text-white font-bold text-xl p-2 hove:bg-blue-500 rounded-md"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
