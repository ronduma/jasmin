import React, { useState, useContext } from 'react';
import "./styles.css";
import "./credentials.css";
import axios from 'axios';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

import { VerificationContext } from '../../context/VerificationContext';

function Credentials({ uid }) {

    const [PDFuploadMode, setPDFuploadMode] = useState(true);
    const [pdfFile, setPdfFile] = useState(null);
    const { pdfFiles, setPdfFiles } = useContext(VerificationContext);;

    const handlePDFFileUpload = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setPdfFile(selectedFile);
        setPDFuploadMode(!PDFuploadMode);
    }

    const handleSubmitPDFFileUpload = async (event, directory) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', pdfFile);
            const ret = await axios.put(`http://localhost:5173/profile/${uid}/${directory}`, formData)
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
            setPdfFiles([...pdfFiles, { filename: pdfFile.name }]);
        } catch (error) {
            console.log('Error uploading profile picture:', error);
        }
    }

    const handlePDFFileDownload = async (event, index) => {
        event.preventDefault();
        console.log("DOWNLOADING PDF", index);
        try {
            await axios({
                url: `http://localhost:5173/profile/download-pdf/${uid}/${index}`,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', pdf_files[index].filename); // or any other filename you want
                document.body.appendChild(link);
                link.click();
            });
        } catch (error) {
            console.log("ERROR DOWNLOADING PDF", error)
        }

    }

    const handlePDFFileDelete = async (event, index) => {
        event.preventDefault();
        await axios.delete(`http://localhost:5173/profile/delete-pdf/${uid}/${index}`)
            .then(response => {
                if (response.data) {
                    console.log("RESPONSE", response);
                }
            })
            .catch(error => {
                console.log(error);
            });
        setPdfLength(pdfLength - 1);
        setPdfFiles(pdfFiles.filter((file, i) => i !== index));
    }

    const [pdfLength, setPdfLength] = useState(pdfFiles.length);

    return (
        <div className="left-section-details" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ "marginTop": 20, "marginBottom": 10 }}> Credentials </div>

            {pdfLength < 1 ? <p>No PDFs uploaded</p> : pdfFiles.map((file, index) => {
                return (
                    <div className='pdf-list'>
                        <Button
                            className="button"
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            endIcon={<FileDownloadIcon />}
                            onClick={(event) => handlePDFFileDownload(event, index)}
                        >
                            {file.filename}
                        </Button>

                        <Button
                            className="button"
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            onClick={(event) => handlePDFFileDelete(event, index)}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                )
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
                                id="PDFfileInput"
                                type='file'
                                onChange={handlePDFFileUpload}
                                style={{ display: "none" }}
                            />
                            <label id="PDFInputLabel" htmlFor="PDFfileInput">Upload PDF</label>
                        </Button>
                        : <Button
                            className="button"
                            style={{ "marginTop": 20 }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<UploadIcon />}
                            onClick={(event) => handleSubmitPDFFileUpload(event, 'upload-pdf')}
                        >
                            Submit Upload
                        </Button>
                    : null}
            </div>
        </div>
    );
}

export default Credentials;