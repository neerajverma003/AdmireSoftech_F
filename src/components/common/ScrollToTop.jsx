import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

/**
 * ScrollToTop Component
 * Automatically resets scroll position to top on route change or smoothly navigates to hash anchors.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow DOM elements of the new page or current page to mount/render
      const timer = setTimeout(() => {
        const targetElement = document.getElementById(hash.replace('#', ''));
        if (targetElement) {
          scrollTo(targetElement, { offset: -80, duration: 1.2 });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Immediate scroll reset to top on route change
      scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, scrollTo]);

  return null;
};

export default ScrollToTop;
