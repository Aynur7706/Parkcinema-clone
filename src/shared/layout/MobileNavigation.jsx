import { t, useLanguage } from '../i18n/language.js';
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import NavigationTile from "./NavigationTile.jsx"

function MobileNavigation({isMenuOpen,toggleMenu}) {
  useLanguage();
  if (!isMenuOpen) return null;

  return (
    <div id="cinema-mobile-menu" role="navigation" aria-label="Mobil menyu" onKeyDown={event => { if (event.key === 'Escape') toggleMenu(); }} className="cinema-mobile-panel md:hidden">
        <div className='py-2' onClick = {toggleMenu}>
            <div className=' bg-[#6B6B6B] w-[30%] h-1 mx-auto'></div>
        </div>
        <div className='grid grid-cols-2 p-3 gap-3'>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/_next/image?url=%2Ficons%2Fglasses.png&w=128&q=75" , 
                    title : t("Profil"),
                    style : "",
                    url : '/auth'
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/_next/image?url=%2Ficons%2Fticket.png&w=128&q=75" , 
                    title : t("Mənim Biletim"),
                    style : ""
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/_next/image?url=%2Ficons%2Ffilm.png&w=128&q=75" , 
                    title : t("Kinoteatrlar"),
                    style : "col-span-2 justify-center",
                    url : '/theatres'
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/_next/image?url=%2Ficons%2Falarm.png&w=128&q=75" , 
                    title : t("Aksiyalar"),
                    style : "col-span-2 justify-center",
                    url : '/actions'
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/icons/call.svg" , 
                    title : t("Əlaqə"),
                    style : "",
                    url : '/contact'
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/icons/faq.svg" , 
                    title : 'FAQ',
                    style : "",
                    url : '/faq'
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/icons/terms.svg" , 
                    title : t("Hüquqi Şərtlər"),
                    style : ""
                }
            }/>
            <NavigationTile values={
                {
                    src : "https://new.parkcinema.az/images/google-play.svg" , 
                    title : '',
                    style : ""
                }
            }/>
        </div>
        <LanguageSwitcher display = {true}/>
    </div>
  )
}

export default MobileNavigation

