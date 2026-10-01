import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedLanguage : "",
  selectedTheatre: "",
  selectedDate: ""
}

export const catalogFiltersSlice = createSlice({
  name: 'catalogFilters',
  initialState,
  reducers: {
    setLanguageFilter : (state,action) => {
        state.selectedLanguage = action.payload
    },
    setTheatreFilter : (state,action) => {
        state.selectedTheatre = action.payload
    },
    setDateFilter : (state, action) => {
        state.selectedDate = action.payload
    }
    
  },
})

export const { setLanguageFilter , setTheatreFilter, setDateFilter } = catalogFiltersSlice.actions

export default catalogFiltersSlice.reducer
