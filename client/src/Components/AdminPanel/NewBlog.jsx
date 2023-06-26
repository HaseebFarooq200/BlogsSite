import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
// import { FileUpload } from 'primereact/fileupload';


const NewBlog = () => {

    // const [selectedFiles, setSelectedFiles] = useState([]);
    // const [imageBase64Data, setImageBase64Data] = useState([]);

    // const handleFileChange = (event) => {
    //     const files = Array.from(event.target.files);
    //     setSelectedFiles(files);
    // };

    // const handleSubmit = () => {
    //     const filePromises = selectedFiles.map((file) => {
    //         return new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onload = (event) => {
    //                 const img = new Image();
    //                 img.onload = () => {
    //                     const canvas = document.createElement('canvas');
    //                     const ctx = canvas.getContext('2d');
    //                     const maxWidth = 800; // Adjust the maximum width as needed
    //                     const maxHeight = 600; // Adjust the maximum height as needed
    //                     let width = img.width;
    //                     let height = img.height;

    //                     if (width > maxWidth) {
    //                         height *= maxWidth / width;
    //                         width = maxWidth;
    //                     }

    //                     if (height > maxHeight) {
    //                         width *= maxHeight / height;
    //                         height = maxHeight;
    //                     }

    //                     canvas.width = width;
    //                     canvas.height = height;
    //                     ctx.drawImage(img, 0, 0, width, height);

    //                     const compressedBase64 = canvas.toDataURL(file.type, 0.7); // Adjust the image quality as needed

    //                     resolve(compressedBase64);
    //                 };
    //                 img.onerror = (error) => {
    //                     reject(error);
    //                 };
    //                 img.src = event.target.result;
    //             };
    //             reader.onerror = (error) => {
    //                 reject(error);
    //             };
    //             reader.readAsDataURL(file);
    //         });
    //     });

    //     Promise.all(filePromises)
    //         .then((base64Strings) => {
    //             // setImageBase64Data(base64Strings);
    //             console.log('Compressed Base64 Data:', base64Strings);
    //         })
    //         .catch((error) => {
    //             console.error('Error converting files to base64:', error);
    //         });
    // };

    // const displayImage = (base64String) => {
    //     const image = new Image();
    //     image.src = base64String;
    //     document.body.appendChild(image);
    // };

    const myAPI = process.env.REACT_APP_API_URL
    const [inputValue, setInputValue] = useState({
        title: '',
        author: ''
    });

    const changeInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const [content, setContent] = useState('');
    const [category, setCategory] = useState('null');
    const categories = [
        { name: 'News' },
        { name: 'Finance' },
        { name: 'Sports' },
        { name: 'Entertainment' },
        { name: 'Life' },
        { name: 'Shopping' }
    ];

    const [cat, setCat] = useState('');

    const CreateBlog = async () => {
        try {
            const { title, author } = inputValue;


            // const base64Strings = imageBase64Data.map((base64String) => ({
            //     name: 'image', // Specify the name of the field where the image data will be sent
            //     data: base64String,
            // }));

            const response = await fetch(`${myAPI}/createblog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author, cat, content })
            });
            await response.json();
            if (response.status === 200) {
                window.alert('Success');
            } else {
                window.alert('Failed');
            }
        } catch (error) {
            window.alert(error);
            console.log(error);
        }

    }
    return (
        <>
            <ScrollPanel style={{ height: '100vh' }}>
                <MDBContainer >
                    <MDBRow >
                        <h3 className='mt-3 text-start ' >Add a New Blog</h3>
                    </MDBRow>
                    <MDBRow className='d-flex flex-column ' >
                        <MDBCol size='md-8'  >
                            <div className=" mt-3 p-inputgroup flex-1 w-50">
                                <InputText
                                    name='title'
                                    value={inputValue.title}
                                    type='text'
                                    placeholder="Title"
                                    onChange={changeInput} />
                            </div>
                            <div className=" mt-3 p-inputgroup flex-1 w-50 ">
                                <InputText
                                    name='author'
                                    value={inputValue.author}
                                    type='text'
                                    placeholder="Author Name"
                                    onChange={changeInput} />
                            </div>
                            <div className=" mt-3 p-inputgroup flex-1 w-50 ">
                                <Dropdown
                                    value={category}
                                    onChange={(e) => {
                                        console.log(e)
                                        setCat(e.value.name)
                                        setCategory(e.value)
                                    }}
                                    options={categories}
                                    optionLabel="name"
                                    placeholder="Category"
                                    className="text-start w-full md:w-14rem" >
                                </Dropdown>
                            </div>
                            {/* <div className="p-inputgroup d-flex flex-column w-75 mt-3">
                            <h5 className="text-start" >Select an Image</h5>
                            <MDBFile id='customFile' /> */}
                            {/* <FileUpload  name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={10000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /> */}
                            {/* </div> */}
                            {/* <div className="p-inputgroup d-flex flex-column w-75 mt-3">
                            <h1>Image Upload</h1>
                            <input type="file"/> */}

                            {/* <button onClick={handleUpload}>Upload</button> */}
                            {/* <h5 className="text-start">Select Images</h5>
                            <input type="file" id="customFile" onChange={handleFileChange} multiple />
                            <MDBBtn onClick={handleSubmit}>Submit</MDBBtn> */}
                            {/* {imageBase64Data.length > 0 && (
                                <div>
                                    <h6>Base64 Data:</h6>
                                    {imageBase64Data.map((base64String, index) => (
                                        <div key={index}>
                                            <p>{base64String}</p>
                                            <button onClick={() => displayImage(base64String)}>Display Image</button>
                                        </div>
                                    ))}
                                </div>
                            )} */}
                            {/* </div> */}

                        </MDBCol>
                        <MDBCol size='md-10' className='mt-3' >
                            <div className="p-inputgroup d-flex flex-column w-100 ">
                                <Editor value={content} onTextChange={(e) => { setContent(e.textValue) }} style={{ height: '500px' }} />
                            </div>
                            <div className="d-flex w-50 ">
                                <MDBBtn className='w-25 mt-3' onClick={CreateBlog} >POST</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </ScrollPanel>

        </>

    )
}

export default NewBlog;









