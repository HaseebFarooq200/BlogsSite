import React, {useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { toggleLogin } from '../../Store/Slices/toggleLogin';
import { useDispatch } from 'react-redux'

export default function Signout() {
    const myAPI = process.env.REACT_APP_API_URL
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const GetSignout = async () => {
        try {
            const response = await fetch(`${myAPI}/signout`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            await response.json()
            if (response.status === 200) {
                dispatch(toggleLogin(0))
                navigate('/')
            }
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        GetSignout()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
    <>
    </>
  )
}
