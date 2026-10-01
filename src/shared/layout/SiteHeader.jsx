import { t, useLanguage } from '../i18n/language.js';
import MobileMenuButton from "./MobileMenuButton.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
import useMobileNavigation from "../hooks/useMobileNavigation.js";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { Link, useLocation } from 'react-router';

function SiteHeader() {
  useLanguage();
  const {isMenuOpen , toggleMenu} = useMobileNavigation()
  const isHome = useLocation().pathname === '/';
  return ( 

    <div className={`cinema-site-header z-100 bg-transparent absolute top-0 right-0 left-0 flex items-center justify-between w-full mx-auto lg:w-[90%] ${isHome ? 'cinema-home-header' : ''}`}>
        <MobileMenuButton onToggle={toggleMenu} isMenuOpen={isMenuOpen} />
        <MobileNavigation  isMenuOpen = {isMenuOpen} toggleMenu={toggleMenu}/>
        
        <div className='cinema-header-main w-full flex items-center justify-center md:justify-start gap-0 lg:gap-36'>
            <div className='cinema-header-logo w-[150px] h-20 shrink-0'>
                <Link to={'/'}>
                    <img className='w-full h-full object-contain' src="https://new.parkcinema.az/images/logo.svg" alt="" />           
                </Link>
            </div>
            <div className='hidden md:block'>
                <menu className='cinema-header-links flex items-center gap-[60px] text-[#d9dadb] whitespace-nowrap'>
                    <Link className='hover:text-[#D52B1E] duration-300 cursor-pointer ' to={'/theatres'}>{t(" Kinoteatrlar ")}</Link>
                    <Link className='hover:text-[#D52B1E] duration-300 cursor-pointer ' to={'/actions'}>{t(" Aksiyalar ")}</Link>
                    <Link className='hover:text-[#D52B1E] duration-300 cursor-pointer ' to={'/faq'}>
                        FAQ
                    </Link>
                    <Link className='hover:text-[#D52B1E] duration-300 cursor-pointer ' to={'/contact'}>{t("Əlaqə")}</Link>
                    <Link className='hover:text-[#D52B1E] duration-300 cursor-pointer ' to={'/auth'}>{t(" Profil ")}</Link>
                </menu>
            </div>    
        </div>
        <LanguageSwitcher display = {false} />
    </div>
  )
}
export default SiteHeader


