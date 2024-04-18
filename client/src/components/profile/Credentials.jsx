import React, { useState } from 'react';
import "./styles.css";
import "./credentials.css";
import axios from 'axios';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

// import { currentUser } from '../../context/AuthContext';

function Credentials({ uid, pdf_files }) {

    const [PDFuploadMode, setPDFuploadMode] = useState(true);
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setPdfFile(selectedFile);
        console.log("HELLO")
        setPDFuploadMode(!PDFuploadMode);
    }

    const handleSubmitFileUpload = async (event, directory) => {
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
            await axios.put(`http://localhost:5173/profile/${uid}/${directory}`, formData)
                .then(response => {
                    if (response.data) {
                        console.log("RESPONSE", response);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            setPdfLength(pdfLength + 1);
            setPDFuploadMode(!PDFuploadMode);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    }

    const handleFileDownload = async (event, index) => {
        event.preventDefault();
        await axios.get(`http://localhost:5173/profile/${uid}/download-pdf/${index}`)
            .then(response => {
                if (response.data) {
                    console.log("RESPONSE", response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleFileDelete = async (event, index) => {
        event.preventDefault();
        await axios.delete(`http://localhost:5173/profile/${uid}/delete-pdf/${index}`)
            .then(response => {
                if (response.data) {
                    console.log("RESPONSE", response);
                }
            })
            .catch(error => {
                console.log(error);
            });
        setPdfLength(pdfLength - 1);
    }

    const [pdfLength, setPdfLength] = useState(pdf_files.length);

    return (
        <div className="left-section-details" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <br />
            <div style={{ "marginTop": 20, "marginBottom": 10 }}> Credentials </div>
            <br />



            {pdfLength < 3 ? <p>No PDFs uploaded</p> : pdf_files.map((file, index) => {
                <div className='pdf-list'>
                    <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        endIcon={<FileDownloadIcon />}
                        onClick={(event) => handleFileDownload(event, index)}
                    >
                        Test
                    </Button>

                    <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick={(event) => handleFileDelete(event, index)}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            })}
            <br />
            <div>
                {pdfLength < 3 ?
                    PDFuploadMode ?
                        <Button
                            className="button"
                            style={{ "marginTop": 20 }}
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
                            style={{ "marginTop": 20 }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<UploadIcon />}
                            onClick={(event) => handleSubmitFileUpload(event, 'upload-pdf')}
                        >
                            Submit Upload
                        </Button>
                    : null}
            </div>
        </div>
    );
}

export default Credentials;