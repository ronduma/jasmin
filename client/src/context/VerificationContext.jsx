import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

export const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [pdfFiles, setPdfFiles] = useState([]);

  // Fetch pdf_files from the database when the component mounts
  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:5173/profile/${currentUser.uid}`)
        .then(response => setPdfFiles(response.data.pdf_files))
        .catch(error => console.error(error));
    }
  }, [currentUser, pdfFiles]); // Depend on currentUser

  return (
    <VerificationContext.Provider value={{ pdfFiles, setPdfFiles }}>
      {children}
    </VerificationContext.Provider>
  );
};