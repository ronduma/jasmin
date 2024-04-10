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
import EditIcon from '@mui/icons-material/Edit';


function Search(props) {
  const [open, setOpen] = React.useState(false);
  const [therapistList, setTherapistList] = React.useState(null);
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
        console.log(therapists);
        setTherapistList(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getTherapists();
  }, []); // Re-run effect whenever currentUser changes

  useEffect(() => {
    console.log(selectedTherapist);
  }, [selectedTherapist])

  useEffect(() => {
    console.log("therapist list updated", therapistList);
  }, [therapistList]); // Run this effect whenever therapistList changes

  const handleChat = async () => {
    console.log("chatting with", selectedTherapist)
    let dm = {
      id: 1,
      to: selectedTherapist,
      messages: []
    }
    try {
      const response = await axios.put(`http://localhost:5173/chat/${props.id}`, dm)
      console.log(response)
    } catch(e){
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}><EditIcon/></IconButton>
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
              options={therapistList ? therapistList.map(therapist => ({
                id: therapist._id,
                name: therapist.firstName + " " + therapist.lastName
              })) : []}
              getOptionLabel={(option) => option.name + " (" + option.id + ")"}
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