export default function AddressInputs({ addressProps, setAddressProp, disabled = false }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-[#2c2b27] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-60";

  const labelClass = "text-sm text-gray-400 font-medium mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Phone</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Phone number"
          value={phone || ""}
          onChange={(ev) => setAddressProp("phone", ev.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Street Address</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Street address"
          value={streetAddress || ""}
          onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Country</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Country"
          value={country || ""}
          onChange={(ev) => setAddressProp("country", ev.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}
