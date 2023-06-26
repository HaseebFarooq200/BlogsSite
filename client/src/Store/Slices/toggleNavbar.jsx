import { createSlice } from '@reduxjs/toolkit'

export const NavbarToggle = createSlice({
    name: 'toggle',
    initialState: Boolean(localStorage.getItem('toggleNavbar')) || false,
    reducers: {
        toggleNavbar: (state, action) => {
            state = action.payload
            localStorage.setItem('toggleNavbar', state);
            return state;
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleNavbar } = NavbarToggle.actions

export default NavbarToggle.reducer