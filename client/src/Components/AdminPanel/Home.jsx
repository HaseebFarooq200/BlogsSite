import React, { useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import {
    MDBIcon,
} from 'mdb-react-ui-kit';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { toggleNavbar } from '../../Store/Slices/toggleNavbar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const myfunc = () => {
        dispatch(toggleNavbar(true))
    }

    const callAdmin = async () => {
        try {
            const res = await fetch(`${myAPI}/calladmin`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            await res.json()
            if (res.status === 200) {
                navigate('/adminhome/:/dashboard')
            }
            else {
                const error = new Error(res.error);
                throw error
            }
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        callAdmin()
        myfunc()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='d-flex'>
                <CDBSidebar textColor="#fff" backgroundColor="#333" className="vh-100"  >
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <span className="text-decoration-none" style={{ color: 'inherit' }}>
                            Control Panel
                        </span>
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <Link to=':/dashboard' >
                                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                            </Link>

                            <Link to=':/blogs' >
                                <CDBSidebarMenuItem icon="table">My Blogs</CDBSidebarMenuItem>
                            </Link>

                            <Link to=':/users' >
                                <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                            </Link>

                            <Link to=':/newblog' >
                                <CDBSidebarMenuItem icon="chart-line">Add New Blog</CDBSidebarMenuItem>
                            </Link>

                            <CDBSidebarMenuItem onClick={() => { navigate('/') }}> <MDBIcon className='me-3 ms-1' fas icon="arrow-left" />  Back To User Panel</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                padding: '20px 5px',
                            }}
                        >
                            Sidebar Footer
                        </div>
                    </CDBSidebarFooter> */}
                </CDBSidebar>
                <div className='ms-1 w-100' >
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home
