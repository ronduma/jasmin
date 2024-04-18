import React, { useState } from 'react';
import "./styles.css";
import "./credentials.css";
import axios from 'axios';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

// import { currentUser } from '../../context/AuthContext';

function Credentials({ pdf_files }) {

    const [uploadMode, setUploadMode] = useState(true);
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setPdfFile(selectedFile);
        console.log("HELLO")
        setUploadMode(!uploadMode);
    }

    const handleSubmitFileUpload = async (directory) => {
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
            await axios.put(`http://localhost:5173/profile/${currentUser.uid}/${directory}`, formData)
                .then(response => {
                    if (response.data) {
                        console.log("RESPONSE", response);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            setUploadMode(!uploadMode);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    }

    const handleFileDownload = async (event, index) => {
        event.preventDefault();
        await axios.get(`http://localhost:5173/profile/${currentUser.uid}/download-pdf/${index}`)
            .then(response => {
                if (response.data) {
                    console.log("RESPONSE", response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="left-section-details" style={{ "width": "100%" }}>
            <br />
            <div style={{ "textAlign": "center" }} > Credentials </div>
            <br />

            <div className='pdf-list'>
                <Button
                    className="button"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    endIcon={<FileDownloadIcon />}
                >
                    Test
                </Button>

                <Button
                    className="button"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                >
                    <DeleteIcon />
                </Button>
            </div>

            {!pdf_files ? <p>No PDFs uploaded</p> : pdf_files.map((file, index) => {
                <Button
                    className="button"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    endIcon={<FileDownloadIcon />}
                    onClick={handleFileDownload(index)}
                >
                    {file.filename}
                </Button>
            })}
            <br />
            <div>
                {uploadMode ?
                    <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<UploadIcon />}
                    >
                        <input
                            id="fileInput"
                            type='file'
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                        />
                        <label id="fileInputLabel" htmlFor="fileInput">Upload PDF</label>
                    </Button>
                    : <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<UploadIcon />}
                        onClick={handleSubmitFileUpload('upload-pdf')}
                    >
                        Submit Upload
                    </Button>

                }
            </div>
        </div>
    );
}

export default Credentials;