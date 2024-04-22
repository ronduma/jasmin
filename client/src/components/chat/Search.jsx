import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';


function Search(props) {
  const [open, setOpen] = useState(false);
  const [searchList, setSearchList] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getTherapists = async () => {
      try{
        const response = await axios.get("http://localhost:5173/therapists/all");
        const therapists = response.data.map(therapist => therapist.firstName + " " + therapist.lastName);
        setSearchList(response.data.sort((a,b)=> {
          const lastNameA = a.lastName.toUpperCase(); 
          const lastNameB = b.lastName.toUpperCase(); 
          if (lastNameA < lastNameB) {
              return -1; 
          }
          if (lastNameA > lastNameB) {
              return 1; 
          }
          return 0; 
        }));
      } catch (e) {
        console.log(e);
      }
    }
    const getPatients = async () => {
      try{
        const response = await axios.get("http://localhost:5173/patients/all");
        const patients = response.data.map(patient => patient.firstName + " " + patient.lastName);
        setSearchList(response.data.sort((a,b)=> {
          const lastNameA = a.lastName.toUpperCase(); 
          const lastNameB = b.lastName.toUpperCase(); 
          if (lastNameA < lastNameB) {
              return -1; 
          }
          if (lastNameA > lastNameB) {
              return 1; 
          }
          return 0; 
        }));
      } catch (e) {
        console.log(e);
      }
    }
    if (props.isTherapist){
      getPatients();
    } else{
      getTherapists();
    }
  }, []); 

  const handleChat = async () => {
    console.log("chatting with", selectedTherapist)
    let user2_id = selectedTherapist.id;
    console.log(user2_id)
    try {
      const response = await axios.put(`http://localhost:5173/chats/${props.id}`, {user2_id})
      console.log(response)
      props.onMessage({isChatting: true, id: response.data.insertedId});
    } catch(e){
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}><AddIcon/></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: 500 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={searchList ? searchList.map(search => ({
                id: search._id,
                name: search.firstName + " " + search.lastName
              })) : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  sx={{margin:"1rem 0 0 0"}}
                  {...params}
                  label="Search users"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
              onChange={(event, value) => setSelectedTherapist(value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleChat}>Chat</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Search;