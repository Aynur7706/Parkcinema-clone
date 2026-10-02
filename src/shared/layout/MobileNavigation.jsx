import { t, useLanguage } from '../i18n/language.js';
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import NavigationTile from "./NavigationTile.jsx"

function MobileNavigation({isMenuOpen,toggleMenu}) {
  useLanguage();
  if (!isMenuOpen) return null;

  return (
    <div id="cinema-mobile-menu" role="navigation" aria-label="Mobil menyu" onClick={event => { if (event.target.closest('a[href]')) toggleMenu(); }} className="cinema-mobile-panel">
        <div className='py-2' onClick = {toggleMenu}>
            <div className=' bg-[#6B6B6B] w-[30%] h-1 mx-auto'></div>
        </div>
        <div className='grid grid-cols-2 p-3 gap-3'>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/glasses.png` ,
                    title : t("Profil"),
                    style : "",
                    url : '/auth'
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/ticket.png` ,
                    title : t("Mənim Biletim"),
                    style : ""
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/film.png` ,
                    title : t("Kinoteatrlar"),
                    style : "col-span-2 justify-center",
                    url : '/theatres'
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/alarm.png` ,
                    title : t("Aksiyalar"),
                    style : "col-span-2 justify-center",
                    url : '/actions'
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/call.svg` ,
                    title : t("Əlaqə"),
                    style : "",
                    url : '/contact'
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/faq.svg` ,
                    title : 'FAQ',
                    style : "",
                    url : '/faq'
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/terms.svg` ,
                    title : t("Hüquqi Şərtlər"),
                    style : ""
                }
            }/>
            <NavigationTile values={
                {
                    src : `${import.meta.env.BASE_URL}images/navigation/google-play.svg` ,
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

