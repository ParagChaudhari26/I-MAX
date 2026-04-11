import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top on route change
  }, [pathname]);

  return null; // This component doesn't render anything
}


// when visited a new webpage from middle of the old web page by using nav bar ,this function opens the new webpage from the starting.