import { useQuery } from "react-query";
import { HotelType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";

function MyBookings() {
  const { data: hotels }= useQuery<HotelType[]>(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <div>No Bookings Found</div>;
  }

  return (
    <div className="space-y-5 ">
      <h1 className="text-3xl font-bold"> My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="text-xs font-normal">
              {hotel.city},{hotel.country}
            </div>
            {hotel.bookings.map((booking) => (
            <div>
              <div>
                <span className="font-bold mr-2">Dates:</span>
                <span>
                  {new Date(booking.checkIn).toDateString()}
                </span> -{" "}
                <span>{new Date(booking.checkOut).toDateString()}</span>
              </div>
              <span className="font-bold mr-2">Guests:</span>
              <span>
                {booking.adultCount} Adults, {booking.childCount} Children
              </span>
            </div>
          ))}
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
