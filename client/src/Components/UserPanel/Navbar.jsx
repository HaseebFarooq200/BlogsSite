import React from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from 'react-redux'
import SignoutNav from '../NavigationControl/SignoutNav';
import AdminSignin from '../NavigationControl/AdminSignin';
import UserSignin from '../NavigationControl/UserSignin';


const Navigationbar = () => {
  const ShowHideNavbar = useSelector((state) => state.toggle)
  const toggleAdmin = useSelector((state) => state.adminToggle)
  const togglelogin = useSelector((state) => state.loginToggle)

  return (
    <>
      {
        togglelogin === 0 ? (
          ShowHideNavbar === false ?
            (
              <SignoutNav />
            )
            :
            (
              <div></div>
            )
        ) :
          ShowHideNavbar === false ? (
            toggleAdmin === 0 ?
              (
                <AdminSignin />
              )
              :
              (
                <UserSignin />
              )
          ) :

            (
              <div></div>
            )
      }

    </>
  )
}

export default Navigationbar
