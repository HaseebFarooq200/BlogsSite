import React, { useState, useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'

const Shopping = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [blogs, setblogs] = useState([])
    const [headblogs, setheadblogs] = useState([])

    const myfunc = () => {
        dispatch(toggleNavbar(false))
    }

    const GetHeadBlog = async () => {
        try {
            const response = await fetch(`${myAPI}/getheadshopping`, {
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

    useEffect(() => {
        myfunc()
        GetHeadBlog()
        GetBlogs()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MDBContainer className='mt-4' >
                {
                    headblogs.map((index) => {
                        const displayText = index.content.slice(0, 300);
                        return (
                            <>
                                <MDBRow>
                                    <MDBCol className='text-start' size='md-4' >
                                        <h2 style={{ cursor: 'pointer' }} className='mt-5' onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }} >{index.title}</h2>
                                        <p style={{ cursor: 'pointer' }} onClick={(e) => {
                                            let blogid = index._id
                                            navigate('/blogpage', { state: { blogid } })
                                        }}>
                                            {displayText}
                                        </p>
                                    </MDBCol>
                                    <MDBCol size="md-8" >
                                        <span>
                                            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                className='w-50 img-fluid' alt='' />
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                            </>
                        )
                    })
                }
            </MDBContainer>

            <MDBContainer style={{ marginTop: '5%' }} className='mb-5'>
                <MDBRow >
                    {
                        blogs.map((index) => {
                            if (index.category === 'Shopping') {
                                const displayText = index.content.slice(0, 90);
                                return (
                                    <>
                                        <MDBCol size="md-4" >
                                            <span>
                                                <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                                    className=' border w-100 img-fluid' alt='' />
                                            </span>
                                            <h5 style={{ cursor: 'pointer' }} className="text-start" onClick={(e) => {
                                                let blogid = index._id
                                                navigate('/blogpage', { state: { blogid } })
                                            }} >
                                                {displayText}
                                            </h5>
                                        </MDBCol>
                                    </>
                                )
                            }
                            return null;
                        })
                    }
                </MDBRow>

                {/* <MDBRow>
                    <MDBCol size="md-4" >
                        <span>
                            <img className='w-100' src="https://www.thefactshop.com/wp-content/uploads/2017/12/gucci-facts.jpg" alt="" />
                        </span>
                        <h5 className="text-start">
                            30 Juicy Facts About Gucci
                        </h5>
                    </MDBCol>
                    <MDBCol size="md-4" >
                        <span>
                            <img className='w-100' src="https://www.thefactshop.com/wp-content/uploads/2017/12/gucci-facts.jpg" alt="" />
                        </span>
                        <h5 className="text-start">
                            30 Juicy Facts About Gucci
                        </h5>
                    </MDBCol>
                    <MDBCol size="md-4" >
                        <span>
                            <img className='w-100' src="https://www.thefactshop.com/wp-content/uploads/2017/12/gucci-facts.jpg" alt="" />
                        </span>
                        <h5 className="text-start">
                            30 Juicy Facts About Gucci
                        </h5>
                    </MDBCol>
                </MDBRow> */}
            </MDBContainer>
        </>
    )
}

export default Shopping
