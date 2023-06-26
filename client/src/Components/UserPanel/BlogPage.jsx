import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";

const BlogPage = () => {
    const myAPI = process.env.REACT_APP_API_URL
    const location = useLocation();

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

    // const displayImage = (base64String) => {
    //     const image = new Image();
    //     image.src = base64String;
    //     document.body.appendChild(image);
    // };

    useEffect(() => {
        GetBlog();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MDBContainer
                className="mt-5 mb-5 shadow shadow-5"
                style={{ backgroundColor: "white" }}
            >
                <MDBRow className=" d-flex flex-column p-2">
                    <MDBCol className="text-start">
                        <span>{blogid}</span>
                    </MDBCol>
                    <MDBCol className="text-start">
                        <h2>{blog.title}</h2>
                    </MDBCol>
                    <MDBCol className="text-start">
                        <h5>{blog.author}</h5>
                        <span>{blog.createdAt}</span>
                    </MDBCol>
                    <MDBCol className="text-start">
                        {
                            blog.images && blog.images.map((image, index) => (
                                <span  key={index} >
                                    <img className="w-100" src={image.data} alt="No display" /> {/* Fixed the typo here */}
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
        </>
    );
};

export default BlogPage;
// front end ok hy backend may masla hy m dekhta hn 