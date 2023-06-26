import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollPanel } from 'primereact/scrollpanel';

const SingleBlog = () => {

    const myAPI = process.env.REACT_APP_API_URL
    const location = useLocation();
    const navigate = useNavigate();

    const blogid = location.state.blogid;

    const [blog, getblog] = useState("");

    const GetBlog = async () => {
        try {
            const response = await fetch(`${myAPI}/blogs/${blogid}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                credentials: "include",
            });

            const blog = await response.json();
            if (response.status === 200) {
                getblog(blog);
            } else {
                const error = new Error(response.error);
                throw error;
            }
        } catch (error) {
            console.log(Error);
        }
    };

    const displayImage = (base64String) => {
        const image = new Image();
        image.src = base64String;
        document.body.appendChild(image);
    };

    useEffect(() => {
        GetBlog();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <ScrollPanel style={{ height: '100vh' }}>
                <MDBContainer>
                    {/* <MDBRow className="d-flex " >
                        <MDBCol>
                            <h3 className='mt-3 text-start ' >Blog</h3>
                        </MDBCol>
                    </MDBRow> */}
                    <MDBContainer
                        className="mt-3 mb-5 shadow shadow-5"
                        style={{ backgroundColor: "white" }}
                    >
                        <MDBRow className=" d-flex flex-column p-2">
                            <MDBCol className="d-flex flex-row text-start">
                                <h2>{blog.title}</h2>
                                <MDBCol className="text-end">
                                    <MDBBtn onClick={(e) => {
                                        navigate('/adminhome/:/updateblog', { state: { blog } })
                                    }} >Edit</MDBBtn>
                                    <MDBBtn className=' ms-2' >Delete</MDBBtn>
                                </MDBCol>
                            </MDBCol>
                            <MDBCol className="text-start">
                                <h5>{blog.author}</h5>
                                <span>{blog.createdAt}</span>
                            </MDBCol>
                            <MDBCol className="text-start">
                                {
                                    blog.images && blog.images.map((image, index) => (
                                        <span key={index} >
                                            {/* <div key={index}> */}
                                            <img src={image.data} alt={image.name} /> {/* Fixed the typo here */}
                                            <button onClick={() => displayImage(image.data)}>Display Image</button>
                                            {/* </div> */}
                                        </span>
                                    )
                                    )
                                }
                                {/* <img className='w-100' src="https://cdn.wallpapersafari.com/60/81/xkZfDs.jpg" alt="" /> */}
                            </MDBCol>
                            <MDBCol className="text-start">
                                <p>{blog.content}.</p>
                                <p>{blog.content}</p>
                                <p>{blog.content}</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    {/* <MDBRow className=' mt-5 ' >
                    <MDBCol size='md-6' className='mx-auto' >
                        <div className="p-inputgroup flex-1 w-50">
                            <InputText disabled type='text' placeholder="Title" />
                        </div>
                        <div className="p-inputgroup flex-1 w-50 ">
                            <InputText type='text' placeholder="Author Name" />
                        </div>
                        <div className="p-inputgroup flex-1 w-50 ">
                            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                placeholder="Category" className="text-start w-full md:w-14rem" />
                        </div>
                        <div className="p-inputgroup flex-1 w-50 ">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder='Choose Date' />
                        </div>
                        <div className="p-inputgroup d-flex flex-column w-75 ">
                            <h5 className="text-start mt-2" >Select an Image</h5>
                            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={10000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                        </div>
                    </MDBCol>
                    <MDBCol size='md-6' >
                        <div className="p-inputgroup d-flex flex-column w-100 ">
                            <h5 className="text-start" >Enter your Blog</h5>
                            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
                        </div>
                        <div className="d-flex justify-content-end w-50 ">
                            <MDBBtn className='w-25 mt-3 ' >POST</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow> */}
                </MDBContainer>
            </ScrollPanel>
        </>
    )
}

export default SingleBlog
