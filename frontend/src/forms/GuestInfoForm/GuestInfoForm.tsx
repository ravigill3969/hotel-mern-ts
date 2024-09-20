import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

function GuestInfoForm({ hotelId, pricePerNight }: Props) {
  const seacrh = useSearchContext();

  const navigate = useNavigate();

  const location = useLocation();

  const { isLoggedIn } = useAppContext();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: seacrh.checkIn,
      checkOut: seacrh.checkOut,
      adultCount: seacrh.adultCount,
      childCount: seacrh.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    seacrh.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      hotelId
    );

    navigate("/sign-in", { state: { from:location } });
  }
  const onSubmit = (data: GuestInfoFormData) => {
    seacrh.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      hotelId
    );

    navigate(`/hotel/${hotelId}/booking`);
  }



  return (
    <div className="flex flex-col p-4 bg-blue-400 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}/night</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)} className="grid grid-cols-1 gap-4 items-center">
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none "
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none "
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={10}
                {...register("adultCount", {
                  required: "Adults is required",
                  min: {
                    value: 1,
                    message: "Adults must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 text-sm font-bold">
                {errors.adultCount.message}
              </span>
            )}

            {errors.childCount && (
              <span className="text-red-500 text-sm font-bold">
                {errors.childCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl mt-2 rounded-md w-full">
              Book Now
            </button>
          ) : (
            <button  className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl mt-2 rounded-md w-full">
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GuestInfoForm;
