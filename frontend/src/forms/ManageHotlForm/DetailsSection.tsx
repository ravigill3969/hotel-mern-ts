import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4 ">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            placeholder="Country"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          className="border rounded w-full py-1 px-2 font-normal"
          rows={10}
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price per night
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          min={1}
          type="number"
          placeholder="Price per night"
          {...register("pricePerNight", { required: "Price is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", { required: "Rating is required" })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="1" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
