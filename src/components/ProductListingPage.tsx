import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  RotateCcw, 
  Home, 
  Check, 
  Filter
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { NewArrivalsExperience } from './NewArrivalsExperience';

interface ProductListingPageProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

type SortOption = 'bestseller' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onNavigateHome,
  searchQuery = '',
  onClearSearch
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('bestseller');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under-30' | '30-60' | 'over-60'>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [newArrivalsViewMode, setNewArrivalsViewMode] = useState<'showcase' | 'grid'>('showcase');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new-arrivals') {
          if (!product.isNew) return false;
        } else if (selectedCategory === 'bags') {
          if (product.category !== 'bags' && !product.subcategory.toLowerCase().includes('bag') && !product.subcategory.toLowerCase().includes('backpack')) {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTagline && !matchesCategory) {
          return false;
        }
      }

      // In stock filter
      if (inStockOnly && (!product.inStock || product.stockCount <= 0)) {
        return false;
      }

      // Price range
      if (priceRange === 'under-30' && product.price >= 30) return false;
      if (priceRange === '30-60' && (product.price < 30 || product.price > 60)) return false;
      if (priceRange === 'over-60' && product.price <= 60) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Default: best seller
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, inStockOnly, priceRange, sortOption]);

  const categoryTitle = useMemo(() => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (selectedCategory === 'all') return 'All Products';
    if (selectedCategory === 'new-arrivals') return 'New Arrivals (Spring 2026)';
    const found = CATEGORIES.find(c => c.id === selectedCategory);
    return found ? found.name : 'Products';
  }, [selectedCategory, searchQuery]);

  const hasActiveFilters = selectedCategory !== 'all' || inStockOnly || priceRange !== 'all' || Boolean(searchQuery);

  const resetAllFilters = () => {
    onSelectCategory('all');
    setInStockOnly(false);
    setPriceRange('all');
    if (onClearSearch) onClearSearch();
  };

  return (
    <div className="bg-neutral-50/50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-1 hover:text-neutral-900 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-neutral-800">{categoryTitle}</span>
        </nav>

        {/* Page Title & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-neutral-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              {selectedCategory !== 'all' && ` in ${categoryTitle}`}
            </p>
          </div>

          {/* Filter & Sorting Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Filter Button */}
            <button
              id="mobile-filter-open-btn"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </button>

            {/* Sorting Dropdown */}
            <div className="relative inline-flex items-center">
              <label htmlFor="sort-dropdown" className="sr-only">Sort by</label>
              <select
                id="sort-dropdown"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-white border border-neutral-300 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 shadow-2xs cursor-pointer"
              >
                <option value="bestseller">Sort by: Best Sellers</option>
                <option value="newest">Sort by: Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-neutral-400 font-medium">Active filters:</span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-800">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => onSelectCategory('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <span>Query: "{searchQuery}"</span>
                <button onClick={onClearSearch} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-800">
                <span>In Stock Only</span>
                <button onClick={() => setInStockOnly(false)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceRange !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-800">
                <span>Price: {priceRange}</span>
                <button onClick={() => setPriceRange('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline ml-2 font-medium"
            >
              Reset all
            </button>
          </div>
        )}

        {/* New Arrivals Mode Switcher */}
        {selectedCategory === 'new-arrivals' && !searchQuery && (
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-neutral-200">
            <div className="inline-flex p-1 rounded-xl bg-neutral-200/80 border border-neutral-300/60">
              <button
                id="btn-mode-showcase"
                type="button"
                onClick={() => setNewArrivalsViewMode('showcase')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  newArrivalsViewMode === 'showcase'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Featured Showcase & Essentials
              </button>
              <button
                id="btn-mode-grid"
                type="button"
                onClick={() => setNewArrivalsViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  newArrivalsViewMode === 'grid'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Browse All New Arrivals Grid ({filteredProducts.length})
              </button>
            </div>
            
            <div className="text-xs text-neutral-500 font-medium hidden sm:block">
              Spring 2026 Collection • Eco-certified materials
            </div>
          </div>
        )}

        {/* Conditional View: Curated Showcase vs Standard Filterable Grid */}
        {selectedCategory === 'new-arrivals' && newArrivalsViewMode === 'showcase' && !searchQuery ? (
          <div className="mt-2">
            <NewArrivalsExperience
              products={products}
              onSelectProduct={onSelectProduct}
              onSelectCategory={onSelectCategory}
              onNavigateHome={onNavigateHome}
            />
          </div>
        ) : (
          /* Main Content Layout: Sidebar Filters + Product Grid */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
              
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  <button
                    id="filter-cat-all"
                    onClick={() => onSelectCategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] opacity-70">{products.length}</span>
                  </button>

                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      id={`filter-cat-${cat.id}`}
                      onClick={() => onSelectCategory(cat.id as ProductCategory)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] opacity-70">{cat.count}</span>
                    </button>
                  ))}

                  <button
                    id="filter-cat-new"
                    onClick={() => onSelectCategory('new-arrivals')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      selectedCategory === 'new-arrivals'
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>New Arrivals</span>
                    <span className="text-[10px] px-1 rounded-sm bg-blue-100 text-blue-700 font-bold">New</span>
                  </button>
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Price Range
                </h3>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-30', label: 'Under $30' },
                    { id: '30-60', label: '$30 to $60' },
                    { id: 'over-60', label: '$60 and Above' }
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price-range"
                        checked={priceRange === option.id}
                        onChange={() => setPriceRange(option.id as any)}
                        className="rounded-full text-neutral-900 focus:ring-neutral-900"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Availability
                </h3>
                <label className="flex items-center space-x-2 cursor-pointer text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded-sm text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Area (PLP-01, PLP-03 2-column mobile, 3-column desktop) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              /* Empty Search / No Results State (NAV-06) */
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  No merchandise matched your filters
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
                  Try clearing your search query or selecting a broader category to explore our Google Store catalog.
                </p>
                <button
                  id="reset-empty-search-btn"
                  onClick={resetAllFilters}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </main>

        </div>
        )}

      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fadeIn">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900">Filters</h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-neutral-500 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Category</p>
                <div className="space-y-1">
                  <button
                    onClick={() => onSelectCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                      selectedCategory === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-neutral-50'
                    }`}
                  >
                    All Products
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id as ProductCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedCategory === cat.id ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-neutral-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Price</p>
                <div className="space-y-2 text-xs">
                  {['all', 'under-30', '30-60', 'over-60'].map(p => (
                    <label key={p} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={priceRange === p}
                        onChange={() => setPriceRange(p as any)}
                      />
                      <span className="capitalize">{p.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="pt-2 border-t border-neutral-100">
                <label className="flex items-center space-x-2 text-xs">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold text-center"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
