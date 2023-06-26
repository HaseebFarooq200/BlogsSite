import React, { useState, useEffect } from 'react'
import {
    MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
const myAPI = process.env.REACT_APP_API_URL

const Dashboard = () => {
    // const navigate = useNavigate()
    const [blogs, setblogs] = useState([])
    const [users, setusers] = useState([])

    const GetBlogs = async () => {
        try {
            const response = await fetch(`${myAPI}/getrandomblogs`, {
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
    const GetUsers = async () => {
        try {
            const response = await fetch(`${myAPI}/getrandomusers`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const users = await response.json()
            if (response.status === 200) {
                setusers(users)
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
        GetBlogs()
        GetUsers()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MDBContainer>
                <MDBRow >
                    <MDBCol size='md-4' >
                        <MDBCard>
                            <MDBCardBody className='text-start' >
                                <MDBCardTitle>Total Users</MDBCardTitle>
                                <MDBCardText>
                                    <h3>1500</h3>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size='md-4' >
                        <MDBCard>
                            <MDBCardBody className='text-start' >
                                <MDBCardTitle>Total Blogs</MDBCardTitle>
                                <MDBCardText>
                                    <h3>1500</h3>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="d-flex mt-5 " >
                    <MDBCol size='md-6' >
                        <h4 className="text-start" >Blogs</h4>
                        <MDBTable className='border' align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Sr.No.</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Author Name</th>
                                    <th scope='col'>Category</th>
                                    <th scope='col'>Date</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    blogs.map((index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        1
                                                    </td>
                                                    <td>
                                                        <p className='fw-bold mb-1 text-center'>{index.title}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1 text-center'> {index.author}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1 text-center'> {index.category}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1 text-center'> {index.createdAt}</p>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>

                    <MDBCol size='md-6' >
                        <h4 className="text-start" >Users</h4>
                        <MDBTable className='border' align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Serial No.</th>
                                    <th scope='col'>Full Name</th>
                                    <th scope='col'>Email</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    users.map((index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        1
                                                    </td>
                                                    <td>
                                                        <p className='fw-bold mb-1 text-center'>{index.fullName}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1 text-center'>{index.email}</p>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Dashboard
