import { t, useLanguage } from '../i18n/language.js';
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router";

const socialIcons = [
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/parkcinema/" },
  { Icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/ParkCinema" },
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@ParkCinemaAzerbaijan" },
  { Icon: FaTelegram, label: "Telegram", href: "https://t.me/parkcinemaofficial" },
  { Icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@parkcinema.az?_t=ZS-8u4JT5RcwdE&_r=1" },
];

const footerLinkClass = "cursor-pointer transition-colors duration-200 hover:text-white focus-visible:text-white motion-reduce:transition-none";

const SiteFooter = () => {
  useLanguage();
  return (
    <footer className="bg-[#7e2729] text-[#d9dadb] text-[16px] font-normal leading-6">
      <div className="mx-auto w-[92%] py-8 md:pb-11">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 md:text-left xl:grid-cols-[1.3fr_0.9fr_1.05fr_1.5fr_0.8fr] xl:gap-10">
          <Link to="/" aria-label={t("Park Cinema ana səhifə")} className="mx-auto block w-[150px] md:mx-0 xl:ml-4">
            <img className="h-auto w-full" src="https://new.parkcinema.az/images/logo.svg" alt="Park Cinema" />
          </Link>

          <ul className="space-y-5">
            <li><Link className={footerLinkClass} to="/theatres">{t("Kinoteatrlar")}</Link></li>
            <li><Link className={footerLinkClass} to="/actions">{t("Aksiyalar")}</Link></li>
            <li><Link className={footerLinkClass} to="/faq">FAQ</Link></li>
          </ul>

          <ul className="space-y-5">
            <li><Link className={footerLinkClass} to="/auth">{t("Profil")}</Link></li>
            <li><Link className={footerLinkClass} to="/contact">{t("Əlaqə")}</Link></li>
            <li><span className={footerLinkClass}>{t("Hüquqi Şərtlər")}</span></li>
            <li><span className={footerLinkClass}>{t("Məxfilik Siyasəti")}</span></li>
          </ul>

          <div>
            <h4>{t("Bizi izləyin")}</h4>
            <div className="mt-5 flex justify-center gap-4 md:justify-start xl:gap-5">
              {socialIcons.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9dadb] text-[#c82026]">
                  <social.Icon className="text-[22px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-start xl:pt-2">
            <img src="https://new.parkcinema.az/icons/Visa.svg" alt="VISA" className="h-8 w-auto" />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p>© Park Cinema, {new Date().getFullYear()}</p>
          <p className={footerLinkClass}>ESAM Innovations</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

