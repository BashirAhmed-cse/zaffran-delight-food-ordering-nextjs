import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Food Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/80 text-black text-sm px-3 py-1 rounded-full shadow">
          ${basePrice}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>

        {/* Add to Cart */}
        <div className="mt-4">
          <AddToCartButton
            image={image}
            hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
          />
        </div>
      </div>
    </div>
  );
}
