import SiteFooter from "../shared/layout/SiteFooter.jsx"
import SiteHeader from "../shared/layout/SiteHeader.jsx"
import CinemaRoutes from "./routes/CinemaRoutes.jsx"
import ScrollReset  from "../shared/navigation/ScrollReset.jsx"
import "../shared/styles/global.css"
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router';
import RouteLoadingOverlay from '../shared/ui/RouteLoadingOverlay.jsx';
function CinemaApp() {
  const location = useLocation();
  return (
    <> 
      <ToastContainer />
      <ScrollReset />
      <SiteHeader />
      <CinemaRoutes key={location.pathname} />
      <RouteLoadingOverlay key={location.key} />
      <SiteFooter />
    </>
  )
}

export default CinemaApp
