import { createSlice } from '@reduxjs/toolkit'

export const LoginToggle = createSlice({
    name: 'logintoggle',
    initialState: parseInt(localStorage.getItem('ToggleLogin')) || 0,
    reducers: {
        toggleLogin: (state, action) => {
            state = action.payload
            localStorage.setItem('ToggleLogin', state);
            return state;
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleLogin } = LoginToggle.actions

export default LoginToggle.reducer
