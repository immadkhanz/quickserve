'use client';

import { useState } from 'react';
import MenuCard from '@/components/MenuCard';

interface Category {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  is_available: boolean;
}

export default function MenuContent({
  categories,
  menuItems,
}: {
  categories: Category[];
  menuItems: MenuItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.id === activeCategory)
    : categories;

  const getFilteredItems = (categoryId: string) => {
    let items = menuItems.filter((item) => item.category_id === categoryId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }
    return items;
  };

  const totalResults = searchQuery.trim()
    ? menuItems.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      }).length
    : menuItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Category Sidebar */}
      <aside className="hidden md:block w-56 shrink-0 sticky top-[85px] self-start">
        <div className="glass rounded-2xl p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 px-2">
            Categories
          </h3>
          <button
            onClick={() => setActiveCategory(null)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === null
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🍽️ All Items
            <span className="ml-2 text-xs text-slate-500">({menuItems.length})</span>
          </button>
          {categories.map((cat) => {
            const count = menuItems.filter((i) => i.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.name}
                <span className="ml-2 text-xs text-slate-500">({count})</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Menu Content */}
      <main className="flex-1 min-w-0">
        {/* Search + Mobile Category Chips */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search the menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl text-slate-200 placeholder-slate-500 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                {totalResults} result{totalResults !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Mobile horizontal scroll chips */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? 'bg-blue-600/50 text-blue-200 border border-blue-500/40'
                  : 'glass text-slate-400 border border-white/5'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600/50 text-blue-200 border border-blue-500/40'
                    : 'glass text-slate-400 border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {!categories || categories.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl">
            <p className="text-slate-300 text-lg font-medium">Menu is currently empty.</p>
            <p className="text-slate-500 text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const categoryItems = getFilteredItems(category.id);
              if (categoryItems.length === 0) return null;

              return (
                <section key={category.id} id={`category-${category.id}`}>
                  <div className="mb-6 border-l-4 border-blue-500 pl-4">
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-slate-400 mt-1 text-sm">{category.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categoryItems.map((item) => (
                      <MenuCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={parseFloat(item.price)}
                        imageUrl={item.image_url}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* No results state */}
            {searchQuery.trim() && totalResults === 0 && (
              <div className="text-center py-16 glass rounded-2xl">
                <p className="text-slate-300 text-lg font-medium">No items found for &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
