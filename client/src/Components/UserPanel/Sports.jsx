import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const Sports = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [blogs, setblogs] = useState([])
    const [limitblogs, setlimitblogs] = useState([])
    const [headblogs, setheadblogs] = useState([])

    const GetLimitBlogs = async () => {
        try {
            const response = await fetch(`${myAPI}/getrandomsports`, {
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
            const response = await fetch(`${myAPI}/getheadsports`, {
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
                                    <MDBCol className=' d-flex flex-column ' size='md-6' >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className=' w-75 img-fluid' alt='' />
                                        </span>
                                        <h3 style={{ cursor: 'pointer' }} className='text-start align-self-start' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} > {index.title}</h3>
                                        <span style={{ cursor: 'pointer' }} className='text-start align-self-start' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} >
                                            {displayText}
                                        </span>
                                    </MDBCol>
                                </>
                            )
                        })
                    }

                    <MDBCol className='' size='md-4'>
                        <MDBRow>
                            {
                                limitblogs.map((index) => {
                                    const displayText = index.content.slice(0, 120);
                                    return (
                                        <>
                                            <MDBCol size='md-6' >
                                                <span>
                                                    <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                        className=' w-75 img-fluid' alt='' />
                                                </span>
                                                <p style={{cursor:'pointer'}} className="text-start" onClick={(e) => {
                                                    let blogid = index._id
                                                    navigate('/blogpage', { state: { blogid } })
                                                }} >{displayText}</p>
                                            </MDBCol>
                                        </>
                                    )
                                })
                            }
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='mt-5 mb-5 '>
                {
                    blogs.map((index) => {
                        if (index.category === 'Sports') {
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
                                                <MDBCol style={{ cursor: 'pointer' }} size='md' className='text-start mt-2' onClick={(e) => {
                                                    let blogid = index._id
                                                    navigate('/blogpage', { state: { blogid } })
                                                }}>
                                                    <p>
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
                        <span>
                            <img className='w-100' src="data:image/jpeg;base64,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" alt="" />
                        </span>
                    </MDBCol>
                    <MDBCol size='md-8'>
                        <MDBRow>
                            <MDBCol size='md' className='text-start' >
                                <span className='text-primary' >Sorts</span>
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

export default Sports
