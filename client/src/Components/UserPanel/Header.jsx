import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux'


const Header = () => {
    const toggle = useSelector((state) => state.toggle.navbar)
    return (
        <>
            {
                toggle === false ?
                <MDBContainer className=" mt-4" >
                    <MDBRow>
                        <MDBCol className="" md='2'>
                            <img
                                src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                                height='30'
                                alt=''
                                loading='lazy'
                            />
                        </MDBCol>
                        <MDBCol className="" md='8'>
                            <div className="p-inputgroup flex-1">
                                <InputText placeholder="Search" />
                                <MDBBtn style={{ width: '20%' }} >
                                    <MDBIcon fas icon="search" size='xl' />
                                </MDBBtn>

                                {/* <Button icon="pi pi-search" className="p-button-warning" /> */}
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>:
                <div></div>
            }
        </>
    )
}

export default Header
