'use client';
import Image from 'next/image';
import { useFadeInArray } from '@/app/hooks/useFadeInArray/useFadeInArray';
import classes from './Collections.module.css';
import animationClasses from '@/app/hooks/useFadeInArray/Animations.module.css'

// Define image paths
const images: string[] = [
  '/images/coffee-stock.jpg',
  '/images/coffee-stock.jpg',
  '/images/coffee-stock.jpg',
];

const Collections: React.FC = () => {
  const { refs, visibleIndexes } = useFadeInArray();
  return (
    <div className={classes['collection-container']}>
      {images.map((src, index) => (
        <div key={index}>
          <Image
            ref={(el) => {
              refs.current.push(el); // Assign ref correctly
            }}
            key={index}
            data-index={index}
            className={`${animationClasses['fade-in']} ${visibleIndexes.includes(index) ? animationClasses['fade-in-visible'] : ''
              }`}
            style={{
              '--delay': `${index * 0.1}s`, // Delay increases by 0.2s per item
            } as React.CSSProperties} // Cast as CSSProperties to avoid TS error
            src={src}
            alt=""
            width={400}
            height={325}
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default Collections;