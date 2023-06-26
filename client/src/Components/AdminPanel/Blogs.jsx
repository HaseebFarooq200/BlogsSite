import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ScrollPanel } from 'primereact/scrollpanel';

const Blogs = () => {
  const myAPI = process.env.REACT_APP_API_URL
  const [blogs, setblogs] = useState([])
  const navigate = useNavigate()

  const GetUsers = async () => {
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

  const DeleteBlog = async (blogid) => {
    try {
      const response = await fetch(`${myAPI}/blogs/${blogid}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json', 'Content-type': 'application/json'
        },
        credentials: 'include'
      })

      await response.json()
      if (response.status === 200) {
        window.alert("DELETED")
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
      <ScrollPanel style={{height: '100vh' }}>
        <MDBTable className='border' align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Serial No.</th>
              <th scope='col'>Title</th>
              <th scope='col'>Author Name</th>
              <th scope='col'>Category</th>
              <th scope='col'>Date</th>
              <th scope='col'>Comments</th>
              <th scope='col'>Likes</th>
              <th scope='col'></th>
              <th scope='col'></th>
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
                        <p className='fw-normal mb-1 text-center'>{index.author}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1 text-center'> {index.category}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1 text-center'> {index.createdAt}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1 text-center'> 158</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1 text-center'> 1054</p>
                      </td>
                      <td>
                        <MDBBtn color='link' rounded size='sm' onClick={(e) => {
                          let blogid = index._id
                          navigate('/adminhome/:/singleblog', { state: { blogid } })
                        }}>
                          View
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn color='link' rounded size='sm' onClick={(e) => {
                          DeleteBlog(index._id)
                        }} >
                          Delete
                        </MDBBtn>
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

export default Blogs
