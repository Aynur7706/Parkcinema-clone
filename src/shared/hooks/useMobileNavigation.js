import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

function useMobileNavigation() {
  const [isMenuOpen , setMenuOpen] = useState(false)

  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const toggleMenu = () => setMenuOpen(previous => !previous)

  return {isMenuOpen , toggleMenu}
 
}

export default useMobileNavigation