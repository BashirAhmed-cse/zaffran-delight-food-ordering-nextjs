"use client";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import MenuItem from "@/components/menu/MenuItem";
import Loading from "../Loading";

const ITEMS_PER_PAGE = 24;

export default function HomeMenu() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <section
      id="menu"
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/images/about-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Menu" subtitle="Browse by Category" />

        {loading ? (
          <div className="text-white text-center mt-12">
            <Loading/>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-5 py-2 rounded-full border text-sm transition-all ${
                  activeCategory === "all"
                    ? "bg-white text-black font-semibold shadow"
                    : "bg-transparent text-white border-white hover:bg-white/10"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`px-5 py-2 rounded-full border text-sm transition-all ${
                    activeCategory === category._id
                      ? "bg-white text-black font-semibold shadow"
                      : "bg-transparent text-white border-white hover:bg-white/10"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {paginatedItems.length > 0 ? (
              <>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                  {paginatedItems.map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center gap-2 text-white">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-full text-sm flex items-center justify-center border transition ${
                        currentPage === page
                          ? "bg-white text-black font-bold shadow"
                          : "border-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </>
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
