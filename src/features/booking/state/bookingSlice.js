import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screeningId: null,
    totalPrice : 0,
    selectedSeats : []
}

export const bookingSlice = createSlice({
    name : 'booking',
    initialState ,
    reducers : {
        setBookingSelection: (state, action) => {
            state.screeningId = action.payload.screeningId;
            state.selectedSeats = action.payload.selectedSeats;
            state.totalPrice = action.payload.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        },
        clearBooking: () => initialState,
        setBookingTotal : (state , action) => {
            state.totalPrice = action.payload
        },
        setBookingSeats : (state , action) => {
            state.selectedSeats = action.payload
        }
    }
}) 

export const { setBookingTotal, setBookingSeats, setBookingSelection, clearBooking } = bookingSlice.actions

export default bookingSlice.reducer
