import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { toggleAdmin } from '../../Store/Slices/toggleAdmin';
import { toggleLogin } from '../../Store/Slices/toggleLogin';
import { useDispatch } from 'react-redux'

const Signin = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });

    const changeInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const myfunc = () => {
        dispatch(toggleNavbar(true))
    }

    const LoginUser = async () => {
        const { email, password } = inputValue
        const response = await fetch(`${myAPI}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const isadmin = await response.json()
        if (response.status === 200) {
            setInputValue({
                email: '',
                password: ''
            })
            dispatch(toggleLogin(1))
            if (isadmin === true) {
                dispatch(toggleAdmin(0))
            }
            else {
                dispatch(toggleAdmin(1))
            }

            window.alert("Login")
            navigate('/')
        }
        else {
            window.alert('Invalid Entry !')
        }
    }

    useEffect(() => {
        myfunc()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MDBContainer className="w-50 shadow shadow-2 mt-5 "  >
                <MDBRow >
                    <span className=" mt-2 d-flex align-self-start" >
                        <MDBIcon size='lg' fas icon="arrow-left" onClick={()=>{navigate('/')}} />
                    </span>
                    <h3 className='mt-3' >Sign in</h3>
                </MDBRow>
                <MDBRow className=' mt-5 ' >
                    <MDBCol size='md-6' className='mx-auto' >
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText
                                name='email'
                                value={inputValue.email}
                                type='email'
                                placeholder="Email"
                                onChange={changeInput}
                            />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1 ">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText
                                name='password'
                                value={inputValue.password}
                                type='password' placeholder="Password"
                                onChange={changeInput}
                            />
                        </div>
                        <MDBBtn className='w-100 mt-3' onClick={LoginUser} >Sign in</MDBBtn>
                        <div className='d-flex justify-content-between mt-3' >
                            <p>Stay sign </p>
                            <p>Forgot User</p>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol size='md-6' className='mx-auto mt-3' >
                        <Link to='/register' >
                            <MDBBtn className='mb-4 w-100' >Create an Account</MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Signin
