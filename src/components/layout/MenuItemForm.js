import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    setIsLoadingCategories(true);
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
        setIsLoadingCategories(false);
      }).catch(() => setIsLoadingCategories(false));
    }).catch(() => setIsLoadingCategories(false));
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image, name, description, basePrice, sizes, extraIngredientPrices, category,
        })
      }
      className="mt-8 max-w-4xl mx-auto bg-gray-900/50 p-6 rounded-xl border border-gray-800 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Section */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <h3 className="text-lg font-semibold text-white mb-4">Item Image</h3>
            <EditableImage 
              link={image} 
              setLink={setImage} 
              className="rounded-lg border-2 border-dashed border-gray-700 hover:border-primary-500 transition-colors"
            />
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            {menuItem?._id ? 'Edit Menu Item' : 'Create New Menu Item'}
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Item name</label>
              <input
                type="text"
                value={name}
                onChange={ev => setName(ev.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. Margherita Pizza"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[100px]"
                placeholder="Describe your menu item..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select 
                value={category} 
                onChange={ev => setCategory(ev.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {isLoadingCategories ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories?.map(c => (
                    <option key={c._id} value={c._id} className="bg-gray-800">
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Base price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={basePrice}
                  onChange={ev => setBasePrice(ev.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-4 border-t border-gray-800">
              <MenuItemPriceProps 
                name={'Sizes'}
                addLabel={'Add item size'}
                props={sizes}
                setProps={setSizes}
                darkMode
              />
            </div>

            {/* Extra Ingredients */}
            <div className="pt-4 border-t border-gray-800">
              <MenuItemPriceProps 
                name={'Extra ingredients'}
                addLabel={'Add ingredients prices'}
                props={extraIngredientPrices}
                setProps={setExtraIngredientPrices}
                darkMode
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full md:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FiSave size={18} />
                {menuItem?._id ? 'Update Menu Item' : 'Create Menu Item'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}