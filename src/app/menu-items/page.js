'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import Loading from "@/components/Loading";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {loading: profileLoading, data} = useProfile();

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(menuItems => {
        setMenuItems(menuItems);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (profileLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  }

  if (!data?.admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-900/20 text-red-500 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>Administrator privileges required</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <UserTabs isAdmin={true} />
        
        {/* Header and Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 mb-6">
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <Link
            href={'/menu-items/new'}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <FiPlus size={18} />
            Create New Menu Item
          </Link>
        </div>

        {/* Menu Items Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Your Menu Items</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl p-4 h-64 animate-pulse"></div>
              ))}
            </div>
          ) : menuItems?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {menuItems.map(item => (
                <Link
                  key={item._id}
                  href={'/menu-items/edit/'+item._id}
                  className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                >
                  {/* Image with overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      src={item.image || '/placeholder-food.jpg'}
                      alt={item.name}
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium truncate w-full">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Item info */}
                  <div className="p-4">
                    <h3 className="font-medium text-white truncate mb-1">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-400 font-medium">
                        ${item.basePrice?.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Edit badge */}
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <FiEdit2 size={14} />
                    Edit
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-800">
              <div className="text-gray-400 mb-4">
                <FiPlus size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No Menu Items Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Get started by creating your first menu item
              </p>
              <Link
                href={'/menu-items/new'}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                <FiPlus size={16} />
                Create Menu Item
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}