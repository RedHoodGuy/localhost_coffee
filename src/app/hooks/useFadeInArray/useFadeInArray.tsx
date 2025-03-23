import { useEffect, useState, useRef } from 'react';

export const useFadeInArray = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const currentRefs = refs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIndices: number[] = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIndices.push(Number(entry.target.getAttribute('data-index')));
          }
        });
        setVisibleIndexes((prevIndexes) => [
          ...new Set([...prevIndexes, ...visibleIndices]),
        ]);
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    refs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return { refs, visibleIndexes };
};