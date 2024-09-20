import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypeFilter = ({ selectedHotelTypes, onchange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rating"
            
            value={type}
            checked={selectedHotelTypes.includes(type)}
            onChange={onchange}
          />
          <span>{type} </span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
