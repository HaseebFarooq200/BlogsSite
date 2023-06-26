import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'
import {
    MDBCardImage,
    MDBCard,
    MDBCardText,
    MDBCardOverlay,
    MDBCardTitle,
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const Finance = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [limitblogs, setlimitblogs] = useState([])
    const [headblogs, setheadblogs] = useState([])
    const [blogs, setblogs] = useState([])

    const GetLimitBlogs = async () => {
        try {
            const response = await fetch(`${myAPI}/getrandomfinance`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const limitblogs = await response.json()
            if (response.status === 200) {
                setlimitblogs(limitblogs)
            }
            else {
                const error = new Error(response.error);
                throw error
            }
        } catch (error) {
            console.log(Error)
        }
    }

    const GetHeadBlog = async () => {
        try {
            const response = await fetch(`${myAPI}/getheadfinance`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const headblogs = await response.json()
            if (response.status === 200) {
                setheadblogs(headblogs)
            }
            else {
                const error = new Error(response.error);
                throw error
            }
        } catch (error) {
            console.log(Error)
        }
    }

    const GetBlogs = async () => {
        try {
            const response = await fetch(`${myAPI}/getblogs`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const blogs = await response.json()
            if (response.status === 200) {
                setblogs(blogs)
            }
            else {
                const error = new Error(response.error);
                throw error
            }
        } catch (error) {
            console.log(Error)
        }
    }
    const myfunc = () => {
        dispatch(toggleNavbar(false))
    }
    useEffect(() => {
        myfunc()
        GetHeadBlog()
        GetLimitBlogs()
        GetBlogs()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MDBContainer className="mt-5"  >
                <MDBRow>
                    {
                        headblogs.map((index) => {
                            const displayText = index.content.slice(0, 300);
                            return (
                                <>
                                    <MDBCol className='' size='md-6' >
                                        <MDBCard background='dark' className='text-white'>
                                            <MDBCardImage style={{ maxHeight: '420px' }}
                                                overlay src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                alt='...' />
                                            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
                                            <MDBCardOverlay className='text-start d-flex flex-column justify-content-end ' >
                                                <MDBCardTitle style={{ cursor: 'pointer' }} onClick={(e) => {
                                                    let blogid = index._id
                                                    navigate('/blogpage', { state: { blogid } })
                                                }} >{index.title}</MDBCardTitle>

                                                <MDBCardText style={{ cursor: 'pointer' }} onClick={(e) => {
                                                    let blogid = index._id
                                                    navigate('/blogpage', { state: { blogid } })
                                                }} >
                                                    {displayText}
                                                </MDBCardText>
                                                {/* <MDBCardText>Last updated 3 mins ago</MDBCardText> */}
                                            </MDBCardOverlay>
                                        </MDBCard>
                                    </MDBCol>
                                </>
                            )
                        })
                    }

                    <MDBCol className='' size='md-4'>
                        {
                            limitblogs.map((index) => {
                                const displayText = index.content.slice(0, 120);
                                return (
                                    <>
                                        <MDBRow className='mt-1' >
                                            <MDBCol>
                                                <span>
                                                    <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                        className=' w-100 img-fluid' alt='' />
                                                </span>
                                            </MDBCol>
                                            <MDBCol className='text-start mt-1' >
                                                <div style={{ cursor: 'pointer' }} onClick={(e) => {
                                                    let blogid = index._id
                                                    navigate('/blogpage', { state: { blogid } })
                                                }} >{displayText}</div>
                                            </MDBCol>
                                        </MDBRow  >
                                    </>
                                )
                            })
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='mt-5 mb-5'>
                {
                    blogs.map((index) => {
                        if (index.category === 'Finance') {
                            const displayText = index.content.slice(0, 250);
                            return (
                                <>
                                    <MDBRow className='mt-5 mb-5' >
                                        <MDBCol size='md-4' >
                                            <span>
                                                <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                    className=' border w-75 img-fluid' alt='' />
                                            </span>
                                        </MDBCol>
                                        <MDBCol size='md-8'>
                                            <MDBRow>
                                                <MDBCol size='md' className='text-start' >
                                                    <span className='text-primary' >{index.category}</span>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol size='md' className='text-start mt-2' >
                                                    <h3 style={{cursor:'pointer'}} onClick={(e) => {
                                                        let blogid = index._id
                                                        navigate('/blogpage', { state: { blogid } })
                                                    }} >{index.title}</h3>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol size='md' className='text-start mt-2' >
                                                    <p style={{ cursor: 'pointer' }} >
                                                        {displayText}
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                </>
                            )
                        }
                        return null;
                    })
                }


                {/* <MDBRow className="mt-5 mb-5" >
                    <MDBCol size='md-4' >
                        <img src='https://www.master-of-finance.org/wp-content/uploads/2020/11/How-are-Finance-and-Economics-Related.jpg'
                            className='w-100 img-fluid' alt='...' />
                    </MDBCol>
                    <MDBCol size='md-8'>
                        <MDBRow>
                            <MDBCol size='md' className='text-start' >
                                <span className='text-primary' >Category</span>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size='md' className='text-start mt-2' >
                                <h3>I'm a Self-Made Millionaire: These Are Investments Everyone Should Avoid During an Economic Downturn</h3>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size='md' className='text-start mt-2' >
                                In an economic downturn, everyone should prioritize making certain investments. Some of these include,
                                but are not limited to, precious metals, healthcare sector stocks and investing in yourself.
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow> */}

            </MDBContainer>
        </>
    )
}

export default Finance
