'use client';
import { useState, useMemo, useEffect } from 'react';
import { useFadeInArray } from '@/app/hooks/useFadeInArray/useFadeInArray';
import ProductCard from '../ProductCard/ProductCard';
import classes from './Shop.module.css';
import animationClasses from '../../hooks/useFadeInArray/Animations.module.css'

// Define Product type
interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

// Define props for Shop component
interface ShopProps {
  products: Product[];
}

const Shop: React.FC<ShopProps> = ({ products }) => {
  const { refs, visibleIndexes } = useFadeInArray();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('name-asc');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesName = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesName && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'quantity-asc':
            return a.quantity - b.quantity;
          case 'quantity-desc':
            return b.quantity - a.quantity;
          default:
            return 0;
        }
      });
  }, [products, searchQuery, minPrice, maxPrice, sortOption]);


  useEffect(() => {
    if (refs.current.length > 0) {
      refs.current.forEach((el) => {
        if (el) {
          el.classList.add(animationClasses['fade-in-visible']);
        }
      });
    }
  }, [refs, filteredProducts]);

  return (
    <div className={classes['shop-container']}>
      {/* Filter Section */}
      <div className={classes['filter-container']}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes['filter-input']}
        />
      {/* Min Price Input */}
    <div className={classes['input-wrapper']}>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className={classes['filter-input']}
      />
      <label htmlFor="min-price" className={classes['input-label']}>Min Price</label>
    </div>

    {/* Max Price Input */}
    <div className={classes['input-wrapper']}>
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className={classes['filter-input']}
      />
      <label htmlFor="max-price" className={classes['input-label']}>Max Price</label>
    </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={classes['filter-input']}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
        </select>
      </div>

        {/* Grid Layout for Product List */}
        <div className={classes['product-grid']}>
        {filteredProducts.map((product, index) => (
            <ProductCard
                ref={(el) => {
                    if (el) {
                        if (el && !refs.current.includes(el)) {
                            refs.current[index] = el; // Assign using index to avoid duplicates
                        }
                    }
                }}
                key={product.id}
                product={product}
                className={`${animationClasses['fade-in']} ${
                    visibleIndexes.includes(index) ? animationClasses['fade-in-visible'] : ''
                }`}
                style={
                    {
                        '--delay': `${index * 0.1}s`, // Delay increases by 0.1s per item
                    } as React.CSSProperties
                }
                />
            ))}
        </div>
    </div>
  );
};

export default Shop;
