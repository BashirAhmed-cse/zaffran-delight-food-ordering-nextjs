import AddToCartButton from "@/components/menu/AddToCartButton";
import { Card, CardContent } from "@/components/ui/card";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <>
      

      <div class="group my-2 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md rounded-md">
        <div class="relative flex h-60 overflow-hidden">
          <img
            class="absolute top-0 right-0 h-full w-full object-cover"
            src={image}
            alt="product"
          />
        </div>
        <div class="mt-1 px-5 pb-2">
          <h5 class="text-xl tracking-tight text-slate-900">{name}</h5>

          <div class="mt-1 flex items-center justify-between text-gray-300">
            {description}
            
          </div>
         <div className="flex items-center text-center justify-center">
           <AddToCartButton
            image={image}
            hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
          />
         </div>
        </div>
        
      </div>
    </>
  );
}
