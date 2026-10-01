import { createRoot } from 'react-dom/client'
import CinemaApp from "./app/CinemaApp.jsx"
import { store } from "./app/store.js"
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <CinemaApp />
        </BrowserRouter>
    </Provider>
)
