//components/ImageSlider.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import classes from './ImageSlider.module.css';

// Define image paths
const images: string[] = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, paused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  return (
    <div
      className={`${classes['slider-wrapper']}`}
    >
      <div className={classes['slider-container']}>
        <div
          className={classes['slide-track']}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, index) => (
            <div className={classes.slide} key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={2440}
                height={1080}
                className="image"
                priority
              />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button className={`${classes['prev']} ${classes['slider-button']}`} onClick={prevSlide} aria-label="Previous Slide">
          ❮
        </button>

        {/* Next Button */}
        <button className={`${classes['next']} ${classes['slider-button']}`} onClick={nextSlide} aria-label="Next Slide">
          ❯
        </button>
      </div>

      {/* Dots for Navigation (moved outside the slider-container) */}
      <div className={classes.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${classes.dot} ${currentIndex === index ? classes.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}

        {/* Pause/Play Button */}
        <span className={`${classes['pause-btn']} ${paused ? 'fa fa-play' : 'fa fa-pause'}`} onClick={togglePause} />
      </div>
    </div>
  );
};

export default ImageSlider;