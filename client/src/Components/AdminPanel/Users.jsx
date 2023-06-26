import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { ScrollPanel } from 'primereact/scrollpanel';

const Users = () => {
    const [users, setusers] = useState([])
    const myAPI = process.env.REACT_APP_API_URL

    const GetUsers = async () => {
        try {
            const response = await fetch(`${myAPI}/getusers`, {
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
        GetUsers()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <ScrollPanel style={{ height: '100vh' }}>
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
            </ScrollPanel>
        </>
    )
}
export default Users
