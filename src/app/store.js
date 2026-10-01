import { configureStore } from '@reduxjs/toolkit'
import catalogFiltersReducer from "../features/catalog/state/catalogFiltersSlice.js"
import bookingReducer from "../features/booking/state/bookingSlice.js"

export const store = configureStore({
  reducer: {
    catalogFilters: catalogFiltersReducer,
    booking: bookingReducer 
  },
})
