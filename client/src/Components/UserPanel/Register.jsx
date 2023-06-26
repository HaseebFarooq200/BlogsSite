import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { InputText } from 'primereact/inputtext'
import { Link, useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'

const Register = () => {
    const myAPI = process.env.REACT_APP_API_URL

    const [inputValue, setInputValue] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
    const myfunc = () => {
        dispatch(toggleNavbar(true))
    }

    const CreateUser = async () => {
        const { fullName, email, password, confirmPassword } = inputValue
        // e.preventDefault();
        const response = await fetch(`${myAPI}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password, confirmPassword })
        })

        await response.json()
        if (response.status === 200) {
            setInputValue({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            window.alert('Registration')
            navigate('/signin')
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
            <MDBContainer className="d-md-flex flex-md-column align-items-end mt-5 "  >
                <MDBRow className=' w-50 shadow shadow-2 border d-flex flex-column ' >
                    <span className=" mt-2 d-flex align-self-start" >
                        <MDBIcon size='lg' fas icon="arrow-left" onClick={() => { navigate('/') }} />
                    </span>
                    <h3 className='mt-3' >Create an Account</h3>
                    <MDBCol size='md-6' className='mx-auto mt-3 ' >
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText
                                name='fullName'
                                value={inputValue.fullName}
                                type='text'
                                placeholder="Full Name"
                                onChange={changeInput} />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1 ">
                            <span className="p-inputgroup-addon">
                                <MDBIcon far icon="envelope" />
                            </span>
                            <InputText
                                name='email'
                                value={inputValue.email}
                                type='email'
                                placeholder="Email"
                                onChange={changeInput} />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText
                                name='password'
                                value={inputValue.password}
                                type='password'
                                placeholder="Password"
                                onChange={changeInput} />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText
                                name='confirmPassword'
                                value={inputValue.confirmPassword}
                                type='password'
                                placeholder="Confirm Password"
                                onChange={changeInput} />
                        </div>
                        <MDBBtn className='w-100 mt-3' onClick={CreateUser} >Sign Up</MDBBtn>
                    </MDBCol>
                    <MDBCol size='md-6' className='mx-auto mt-3' >
                        <Link to='/signin' >
                            <MDBBtn className='mb-4 w-100' >Already have an Account ?</MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow>
                {/* <MDBRow className='w-50 mt-5 border' >
                    <MDBCol size='md-6' className='mx-auto' >
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText type='text' placeholder="Full Name" />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1 ">
                            <span className="p-inputgroup-addon">
                                <MDBIcon far icon="envelope" />
                            </span>
                            <InputText type='email' placeholder="Email" />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText type='password' placeholder="Password" />
                        </div>
                        <div className="p-inputgroup flex-1 mt-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText type='password' placeholder="Confirm Password" />
                        </div>
                        <MDBBtn className='w-100 mt-3' >Sign Up</MDBBtn>
                    </MDBCol>
                </MDBRow> */}
                {/* <MDBRow className='w-50 border'>
                    <MDBCol size='md-6' className='mx-auto mt-3' >
                        <Link to='/signin' >
                            <MDBBtn className='mb-4 w-100' >Already have an Account ?</MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow> */}
            </MDBContainer>
        </>
    )
}

export default Register
