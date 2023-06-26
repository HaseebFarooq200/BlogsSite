import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const News = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [blogs, setblogs] = useState([])
    const [limitblogs, setlimitblogs] = useState([])
    const [headblogs, setheadblogs] = useState([])

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
            const response = await fetch(`${myAPI}/getrandomnews`, {
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
            const response = await fetch(`${myAPI}/getheadnews`, {
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
        GetLimitBlogs()
        GetHeadBlog()
        GetBlogs()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MDBContainer className="mt-5 "  >
                {
                    headblogs.map((index) => {
                        const displayText = index.content.slice(0, 300) + '....';
                        return (
                            <>
                                <MDBRow>
                                    <MDBCol className='' size='md-7' >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className='w-50 img-fluid' alt='' />
                                        </span>
                                    </MDBCol>
                                    <MDBCol className='' size='md-4'>
                                        <h3 className='mt-2 text-start' style={{ cursor: 'pointer' }} onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }}  >{index.title}</h3>

                                        <p className='mt-2 text-start' style={{ cursor: 'pointer' }} onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }}>{displayText}</p>
                                    </MDBCol>
                                </MDBRow>
                            </>
                        )
                    })
                }
                {/* <MDBRow>
                    <MDBCol className='' size='md-7' >
                        <span>
                            <img src='https://ichef.bbci.co.uk/news/490/cpsprodpb/1388/production/_129800050_zelensky_getty_21st_may.jpg'
                                className='w-100 ' alt='...' />
                        </span>
                    </MDBCol>
                    <MDBCol className='' size='md-4'>
                        <h3 className='mt-2 text-start ' >Biden and McCarthy to meet Monday for debt ceiling negotiations</h3>
                        <p className='mt-2 text-start ' >"Now it's time for the other side to move from their extreme positions," Biden added during a press conference before his departure from Hiroshima, where he spent recent days meeting with world leaders at a G-7 leaders summit</p>
                    </MDBCol>
                </MDBRow> */}
            </MDBContainer>

            <MDBContainer>
                <MDBRow>
                    {
                        limitblogs.map((index) => {
                            const displayText = index.content.slice(0, 120);
                            return (
                                <>
                                    <MDBCol size='md-4' className='mt-1' >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className='w-75' alt='' />
                                        </span>
                                        <p className="text-start" style={{ cursor: 'pointer' }} onClick={(e) => {
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

            <MDBContainer className='mt-5 mb-5 '>
                {
                    blogs.map((index) => {
                        if (index.category === 'News') {
                            const displayText = index.content.slice(0, 250);
                            return (
                                <>
                                    <MDBRow className="mt-5 mb-5" >
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
                                                    <h3 style={{cursor:'pointer'}}  onClick={(e) => {
                                                        let blogid = index._id
                                                        navigate('/blogpage', { state: { blogid } })
                                                    }} >{index.title}</h3>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol size='md' className='text-start mt-2' >
                                                    <p style={{ cursor: 'pointer' }} onClick={(e) => {
                                                        let blogid = index._id
                                                        navigate('/blogpage', { state: { blogid } })
                                                    }}>
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
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSbtn0LarXlaAIsJNe6Bk0RBdA2x__b1QJ8g&usqp=CAU'
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

export default News
