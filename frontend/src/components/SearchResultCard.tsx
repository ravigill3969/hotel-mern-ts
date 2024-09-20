import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

function SearchResultCard({ hotel }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-r0ws-[1fr-2fr-1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar key={Math.random()*100*Math.random()*100} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-2 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">{hotel.name}</Link>
        </div>
        <div className="line-clamp-4">{hotel.description}</div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 text-xs rounded-lg whitespace-nowrap font-bold">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex gap-1 flex-col items-end">
            <span className="font-bold">
              {hotel.pricePerNight.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              per night
            </span>

            <Link to={`/detail/${hotel._id}`} className="bg-blue-600 text-white h-full font-bold text-xl max-w-fit p-2 rounded-lg hover:bg-blue-500">
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
