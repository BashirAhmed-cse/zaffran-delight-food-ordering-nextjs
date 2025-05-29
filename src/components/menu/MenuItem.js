import {CartContext} from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import {useContext, useState} from "react";
import FlyingButton from "@/components/FlyingButton";
import toast from "react-hot-toast";

export default function MenuItem(menuItem) {
  const {
    image,name,description,basePrice,
    sizes, extraIngredientPrices,
  } = menuItem;
  const [
    selectedSize, setSelectedSize
  ] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  async function handleAddToCartButtonClick() {

    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
  }
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
     {showPopup && (
  <div
    onClick={() => setShowPopup(false)}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
  >
    <div
      onClick={(ev) => ev.stopPropagation()}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
    >
      <div className="overflow-y-auto p-4" style={{ maxHeight: '90vh' }}>
        {/* Product Image */}
        <Image
          src={image}
          alt={name}
          width={400}
          height={250}
          className="mx-auto rounded-xl"
        />

        {/* Product Name & Description */}
        <h2 className="text-xl font-semibold text-center mt-4">{name}</h2>
        <p className="text-center text-gray-600 text-sm mb-4">{description}</p>

        {/* Size Options */}
        {sizes?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-gray-700 text-center font-medium mb-2">Choose a Size</h3>
            <div className="space-y-2">
              {sizes.map((size) => (
                <label
                  key={size._id}
                  className={`flex items-center justify-between px-4 py-2 rounded-md border cursor-pointer text-gray-900 ${
                    selectedSize?.name === size.name
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      onChange={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                      name="size"
                    />
                    <span>{size.name}</span>
                  </div>
                  <span className="font-medium text-gray-800">
                    ${basePrice + size.price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Extra Ingredients */}
        {extraIngredientPrices?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-gray-700 text-center font-medium mb-2">Add Extras</h3>
            <div className="space-y-2">
              {extraIngredientPrices.map((extra) => (
                <label
                  key={extra._id}
                  className="flex items-center justify-between px-4 py-2 rounded-md border border-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(ev) => handleExtraThingClick(ev, extra)}
                      checked={selectedExtras.map((e) => e._id).includes(extra._id)}
                      name={extra.name}
                    />
                    <span className="text-gray-900">{extra.name}</span>
                  </div>
                  <span className="text-gray-800">+${extra.price}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <FlyingButton targetTop="5%" targetLeft="95%" src={image}>
          <div
            className="bg-green-500 text-white font-semibold py-3 text-center rounded-xl hover:bg-primary-dark transition p-2"
            onClick={handleAddToCartButtonClick}
          >
            Add to cart ${selectedPrice}
          </div>
        </FlyingButton>

        {/* Cancel Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="max-w-full flex justify-end items-end mt-3 p-2 rounded-md text-sm text-center text-gray-500 hover:text-gray-700 transition bg-red-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem} />
    </>
  );
}