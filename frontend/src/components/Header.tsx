import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight ">
          <Link to={"/"}>Hotel Booking</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center  text-white rounded-lg transition px-3 font-bold hover:bg-blue-600 "
              >
                My Bookings
              </Link>

              <Link
                to="/my-hotels"
                className="flex items-center text-white rounded-lg transition px-3 font-bold hover:bg-blue-600 "
              >
                My Hotels
              </Link>

              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center px-3 py-2 text-blue-600 bg-white font-bold rounded hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
