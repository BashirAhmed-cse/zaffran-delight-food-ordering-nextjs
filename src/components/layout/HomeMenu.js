"use client";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import MenuItem from "@/components/menu/MenuItem";

export default function HomeMenu() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, itemRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/menu-items"),
        ]);
        const [categoriesData, menuItemsData] = await Promise.all([
          catRes.json(),
          itemRes.json(),
        ]);
        setCategories(categoriesData);
        setMenuItems(menuItemsData);
        setActiveCategory(categoriesData[0]?._id); // Default to first category
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getItemsByCategory = (categoryId) =>
    menuItems.filter((item) => item.category === categoryId);

  return (
    <section
      id="specials"
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/images/about-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Menu" subtitle="Browse by Category" />

        {loading ? (
          <div className="text-white text-center mt-12">Loading menu...</div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-10">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    activeCategory === category._id
                      ? "bg-white text-black font-semibold"
                      : "bg-transparent text-white border-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Filtered Items */}
            {/* Filtered Items */}
            {getItemsByCategory(activeCategory).length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {getItemsByCategory(activeCategory).map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-white text-center mt-10 text-lg">
                No items available in this category.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
