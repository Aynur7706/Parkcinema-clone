import ProfilePage from '../../features/auth/pages/ProfilePage.jsx';
import { t, useLanguage } from '../../shared/i18n/language.js';
import ContentState from '../../shared/ui/ContentState.jsx';
import {Routes , Route} from "react-router"
import CatalogPage from "../../features/catalog/pages/CatalogPage.jsx"
import MovieDetailsPage from "../../features/catalog/pages/MovieDetailsPage.jsx"
import SeatSelectionPage from "../../features/booking/pages/SeatSelectionPage.jsx"
import CheckoutPage from "../../features/booking/pages/CheckoutPage.jsx"
import AuthLayout from "../../features/auth/layout/AuthLayout.jsx"
import LoginPage from "../../features/auth/pages/LoginPage.jsx"
import RegisterPage from "../../features/auth/pages/RegisterPage.jsx"
import TheatreListPage from "../../features/theatres/pages/TheatreListPage.jsx"
import TheatreDetailsPage from "../../features/theatres/pages/TheatreDetailsPage.jsx"
import FaqPage from "../../features/information/pages/FaqPage.jsx"
import PromotionsPage from "../../features/information/pages/PromotionsPage.jsx"
import PromotionDetailsPage from "../../features/information/pages/PromotionDetailsPage.jsx"
import ContactPage from "../../features/information/pages/ContactPage.jsx"
import TrailersPage from "../../features/catalog/pages/TrailersPage.jsx"

function CinemaRoutes() {
  useLanguage();
  return (
    <Routes>
        <Route path="/" element={<CatalogPage />}/>
        <Route path="/trailers" element={<TrailersPage />}/>
        <Route path="/detail/:id" element={<MovieDetailsPage />}/>
        <Route path="/seat-selection/:id" element={<SeatSelectionPage />}/>
        <Route path="/buy-ticket/:id" element={<CheckoutPage />}/>
        <Route path="/general" element={<ProfilePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage />}/>
        </Route>
        <Route path="/theatres" element={<TheatreListPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/actions" element={<PromotionsPage />} />
        <Route path="/campaigns/:id" element={<PromotionDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/theatres-detail/:id" element={<TheatreDetailsPage />}/>
        <Route path="*" element={<ContentState page code="404" title={t("Səhifə tapılmadı")} message={t("Ünvan səhv yazılmış və ya səhifə silinmiş ola bilər.")} to="/" linkLabel={t("Ana səhifəyə qayıt")} />} />
    </Routes>
  )
}

export default CinemaRoutes


