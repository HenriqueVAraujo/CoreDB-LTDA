import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll instantâneo ao topo para qualquer mudança de rota
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Comportamento instantâneo ao invés de smooth
    });
  }, [location]);

  return null;
}
