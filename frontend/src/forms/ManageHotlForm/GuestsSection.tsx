import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-2 font-normal"
            type="number"
            min={1}
            placeholder=""
            {...register("adultCount", { required: "Adult count is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Childs
          <input
            className="border rounded w-full py-2 px-2 font-normal"
            type="number"
            min={1}
            placeholder=""
            {...register("childCount", { required: "Child count is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestsSection;
