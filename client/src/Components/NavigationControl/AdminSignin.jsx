import React from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBIcon } from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const AdminSignin = () => {
    return (
        <>
            <Navbar style={{ fontFamily: 'sans-serif', fontSize: '10px', lineHeight: '30px', fontWeight: '800', textTransform: 'uppercase' }} bg="dark" variant='dark' expand="lg">
                <Container fluid >
                    <Navbar.Toggle aria-controls="navbarScroll" className='text-white' >
                        <MDBIcon fas icon="bars" />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 ms-lg-5 ps-lg-5 "
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link >
                                <Link to='/' className='text-white' style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="home" className='me-2' size='xs' />
                                    Home
                                </Link>
                            </Nav.Link>
                            

                            <Nav.Link >
                                <Link className='text-white ms-3' to="/news" style={{textDecoration:'none'}} >
                                    <MDBIcon far icon="newspaper" className='me-2' size='xs' />
                                    News
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to='/finance' style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="briefcase" className='me-2' size='xs' />
                                    Finance
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to="/sports" style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="football-ball" className='me-2' size='xs' />
                                    Sports
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to='/entertainment' style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="cocktail" className='me-2' size='xs' />
                                    Entertainment
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to='/life' style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="heartbeat" className='me-2' size='xs' />
                                    Life
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to="/shopping" style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="shopping-bag" className='me-2' size='xs' />
                                    Shopping
                                </Link>
                            </Nav.Link>

                            <Nav.Link  >
                                <Link className='text-white ms-3' to="/adminhome/:/dashboard" style={{textDecoration:'none'}} >
                                    <MDBIcon fas icon="shopping-bag" className='me-2' size='xs' />
                                    Admin Panel
                                </Link>
                            </Nav.Link>

                        </Nav>
                        <Nav.Link  >
                            <Link className='text-white me-lg-5' to='/signout'  >
                                <MDBIcon fas icon="sign-in-alt" className='me-2' size='xs' />
                                Sign out
                            </Link>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default AdminSignin
