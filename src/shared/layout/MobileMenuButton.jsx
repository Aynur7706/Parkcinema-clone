import { t, useLanguage } from '../i18n/language.js';
import { FaBars, FaTimes } from 'react-icons/fa';
export default function MobileMenuButton({ onToggle, isMenuOpen }) {
  useLanguage();
  return <button type="button" onClick={onToggle} aria-label={isMenuOpen ? t("Menyunu bağla") : t("Menyunu aç")} aria-expanded={isMenuOpen} aria-controls="cinema-mobile-menu" className="cinema-mobile-toggle">{isMenuOpen ? <FaTimes /> : <FaBars />}</button>;
}
