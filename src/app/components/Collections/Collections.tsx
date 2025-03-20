'use client';
import Image from 'next/image';
import classes from './Collections.module.css';

// Define image paths
const images: string[] = [
  '/images/coffee-stock.jpg',
  '/images/coffee-stock.jpg',
  '/images/coffee-stock.jpg',
];

const Collections: React.FC = () => {
  return (
    <div className={classes['collection-container']}>
      {images.map((src, index) => (
        <div key={index} className={classes['collection']}>
          <Image
            src={src}
            alt=""
            width={400}
            height={325}
            className="image"
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default Collections;