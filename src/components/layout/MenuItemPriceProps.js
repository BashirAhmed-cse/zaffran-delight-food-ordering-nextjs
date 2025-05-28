import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import { useState } from "react";

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(true);

  function addProp() {
    setProps(oldProps => {
      return [...oldProps, { name: '', price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = prop === 'price' ? parseFloat(ev.target.value) || 0 : ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 mb-6">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
        type="button"
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
          <span className="font-medium text-white">{name}</span>
          <span className="text-sm text-gray-400">({props?.length || 0})</span>
        </div>
      </button>
      
      <div className={`${isOpen ? 'block' : 'hidden'} p-4 pt-0`}>
        <div className="space-y-4">
          {props?.length > 0 && props.map((size, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="e.g. Large, Extra Cheese"
                  value={size.name}
                  onChange={ev => editProp(ev, index, 'name')}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-300 mb-1">Extra price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={size.price}
                    onChange={ev => editProp(ev, index, 'price')}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="w-full p-2 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                  title="Remove"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addProp}
          className="mt-4 w-full md:w-auto px-4 py-2 flex items-center gap-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}