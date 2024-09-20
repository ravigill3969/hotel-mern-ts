type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Price</h4>
      <select
        className="border p-2 rounded-md w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">All</option>
        {[1,100, 200, 300, 400, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;
