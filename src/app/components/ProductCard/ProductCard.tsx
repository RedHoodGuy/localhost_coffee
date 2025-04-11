'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import classes from './ProductCard.module.css';

// Define the type for the product prop
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define props for ProductCard
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

// Use forwardRef to allow refs to be passed
const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${classes['product-card']} ${className}`} // Combine classes
        style={style}
        {...props} // Spread remaining props
      >
        <Image
          src={product.imageUrl || "/images/coffee-stock.jpg"}
          alt={product.name}
          width={300}
          height={300}
          className={classes['product-image']}
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price.toFixed(2)}</p>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard'; // Required for forwardRef

export default ProductCard;