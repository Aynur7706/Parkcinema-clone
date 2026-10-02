import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

function useMobileNavigation() {
  const [isMenuOpen , setMenuOpen] = useState(false)

  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const closeOnEscape = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('resize', closeOnDesktop);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(previous => !previous)

  return {isMenuOpen , toggleMenu}
 
}

export default useMobileNavigation
