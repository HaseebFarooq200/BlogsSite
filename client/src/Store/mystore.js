import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './Slices/counterSlice.jsx'
import toggleNavbar from './Slices/toggleNavbar.jsx'
import adminToggle from './Slices/toggleAdmin.jsx'
import loginToggle  from './Slices/toggleLogin.jsx'

export default configureStore({
  reducer: {
    counter:CounterSlice,
    toggle: toggleNavbar,
    adminToggle:adminToggle,
    loginToggle:loginToggle
  }
})