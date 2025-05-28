'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import { FiEdit2, FiX, FiPlus, FiCheck, FiTrash2 } from "react-icons/fi";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [editedCategory, setEditedCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setLoadingCategories(true);
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch(() => {
        toast.error("Failed to load categories.");
        setLoadingCategories(false);
      });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    const data = { name: categoryName };
    if (editedCategory) data._id = editedCategory._id;

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCategoryName('');
        setEditedCategory(null);
        fetchCategories();
        resolve();
      } else {
        const errorText = await response.text();
        console.error("API error:", errorText);
        reject(errorText || 'Something went wrong');
      }
    });

    await toast.promise(promise, {
      loading: editedCategory ? 'Updating category...' : 'Creating category...',
      success: editedCategory ? 'Category updated!' : 'Category created!',
      error: (err) => err || 'Operation failed',
    });
  }

  async function handleDeleteClick(_id) {
    if (isDeleting) return;
    setIsDeleting(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/categories?_id=' + _id, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCategories();
          resolve();
        } else {
          const error = await response.text();
          reject(error || 'Failed to delete');
        }
      } catch (err) {
        reject(err.message);
      } finally {
        setIsDeleting(false);
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting category...',
      success: 'Category deleted!',
      error: (err) => err || 'Failed to delete category',
    });
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Loading user info...</div>
      </div>
    );
  }

  if (!profileData?.admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 bg-red-900/20 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>Administrator privileges required</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <UserTabs isAdmin={true} />

        {/* Form Section */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editedCategory ? 'Update Category' : 'Create New Category'}
          </h2>
          <form onSubmit={handleCategorySubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name
                  {editedCategory && (
                    <span className="text-primary-400 ml-2">
                      (Currently editing: {editedCategory.name})
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(ev) => setCategoryName(ev.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!categoryName.trim()}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    !categoryName.trim()
                      ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {editedCategory ? (
                    <>
                      <FiCheck size={20} />
                      Update Category
                    </>
                  ) : (
                    <>
                      <FiPlus size={20} />
                      Create Category
                    </>
                  )}
                </button>
                {editedCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditedCategory(null);
                      setCategoryName('');
                    }}
                    className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg flex items-center gap-2 transition-all"
                  >
                    <FiX size={20} />
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Categories List Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Existing Categories</h2>
            <span className="text-sm text-gray-400">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </span>
          </div>

          {loadingCategories ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-900/50 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors group"
                >
                  <span className="font-medium text-gray-100">{category.name}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-2.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                      title="Edit category"
                      onClick={() => {
                        setEditedCategory(category);
                        setCategoryName(category.name);
                      }}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(category._id)}
                      disabled={isDeleting}
                      className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete category"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-lg border-2 border-dashed border-gray-800">
              <FiX size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Create your first category using the form above
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}