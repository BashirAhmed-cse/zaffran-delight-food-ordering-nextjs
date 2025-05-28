"use client";

import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="md:flex gap-6">
      <div className="flex justify-center md:block">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      <form
        className="flex-1 space-y-4"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <div>
          <label className="block mb-1 text-sm font-medium">First and last name</label>
          <input
            type="text"
            className="w-full border rounded p-2 bg-[#2c2b27]"
            placeholder="First and last name"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2 bg-[#2c2b27] cursor-not-allowed"
            disabled
            value={user.email}
            placeholder="email"
          />
        </div>

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        {loggedInUserData?.admin && (
          <div className="flex items-center gap-2">
            <input
              id="adminCb"
              type="checkbox"
              checked={admin}
              onChange={(ev) => setAdmin(ev.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="adminCb" className="text-sm">
              Grant Admin Access
            </label>
          </div>
        )}

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
