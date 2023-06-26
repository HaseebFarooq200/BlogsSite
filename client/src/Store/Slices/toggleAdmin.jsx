import { createSlice } from '@reduxjs/toolkit'



export const AdminToggle = createSlice({
    name: 'admintoggle',
    initialState: parseInt(localStorage.getItem('ToggleAdmin')) || 0,
    reducers: {
        toggleAdmin: (state, action) => {
            state = action.payload
            localStorage.setItem('ToggleAdmin', state);
            return state;
            // state.status = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleAdmin } = AdminToggle.actions

export default AdminToggle.reducer
