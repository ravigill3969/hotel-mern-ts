import { hotelFacilities} from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onchange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rating"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onchange}
          />
          <span>{facility} </span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
