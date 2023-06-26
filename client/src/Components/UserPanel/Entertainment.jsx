import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';


const Entertainment = () => {
    const myAPI = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()
    const [blogs, setblogs] = useState([])
    const [limitblogs, setlimitblogs] = useState([])
    const [headblogs, setheadblogs] = useState([])

    const navigate = useNavigate()

    const myfunc = () => {
        dispatch(toggleNavbar(false))
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
    const GetLimitBlogs = async () => {
        try {
            const response = await fetch(`${myAPI}/getrandomentertainment`, {
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
            const response = await fetch(`${myAPI}}/getheadentertainment`, {
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

    useEffect(() => {
        myfunc()
        GetHeadBlog()
        GetLimitBlogs()
        GetBlogs()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MDBContainer className="mt-5 "  >
                {
                    headblogs.map((index) => {
                        const displayText = index.content.slice(0, 300);
                        return (
                            <>
                                <MDBRow>
                                    <MDBCol className='' size='md-7' >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className='  w-50 img-fluid' alt='' />
                                        </span>
                                    </MDBCol>
                                    <MDBCol className='' size='md-4'>
                                        <h3 style={{ cursor: 'pointer' }} className='mt-2 text-start ' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} >{index.title}</h3>
                                        <p style={{ cursor: 'pointer' }} className='mt-2 text-start' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} >
                                            {displayText}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                            </>
                        )
                    })
                }
                {/* <MDBRow>
                    <MDBCol className='' size='md-7' >
                        <span>
                            <img className='w-100' src="https://ichef.bbci.co.uk/news/976/cpsprodpb/9CB5/production/_128271104_pathaancleanposter.jpg" alt="" />
                        </span>
                    </MDBCol>
                    <MDBCol className='' size='md-4'>
                        <h3 className='mt-2 text-start ' >Beyoncé and Jay-Z buy most expensive home ever in California</h3>
                        <p className='mt-2 text-start ' >
                            The 8-acre concrete compound overlooks the Pacific Ocean in the exclusive Paradise Cove area and was designed by famed Japanese
                            architect, Tadao Ando. The 40,000 square foot home doubles as an art museum as the property was commissioned by modern art
                            collectors Bill and Maria Bell more than a decade ago. It's no surprise, then, that the superstars took to the estate as their
                            private art collection is said to be quite impressive.
                        </p>
                    </MDBCol>
                </MDBRow> */}
            </MDBContainer>

            <MDBContainer >
                <MDBRow>
                    {
                        limitblogs.map((index) => {
                            const displayText = index.content.slice(0, 120);
                            return (
                                <>
                                    <MDBCol size='md-2' className='mt-1' >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className=' w-100 img-fluid' alt='' />
                                        </span>
                                        <p style={{ cursor: 'pointer' }} className='text-start' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} >
                                            {displayText}
                                        </p>
                                    </MDBCol>
                                </>
                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='mt-5 mb-5'>
                {
                    blogs.map((index) => {
                        if (index.category === 'Entertainment') {
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
                                                    <h3 style={{ cursor: 'pointer' }} onClick={(e) => {
                                                        let blogid = index._id
                                                        navigate('/blogpage', { state: { blogid } })
                                                    }} >{index.title}</h3>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol size='md' className='text-start mt-2'  >
                                                    <p style={{ cursor: 'pointer' }} onClick={(e) => {
                                                        let blogid = index._id
                                                        navigate('/blogpage', { state: { blogid } })
                                                    }} >
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
            </MDBContainer>
        </>
    )
}

export default Entertainment
