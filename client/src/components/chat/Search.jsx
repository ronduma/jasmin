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
    const getPatients = async () => {
      try{
        const response = await axios.get(`http://localhost:5173/patients/all/${props.id}`);
        setSearchList(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getPatients();
  }, []); 

  const handleChat = async () => {
    console.log("chatting with", selectedTherapist.name)
    try {
      props.onMessage({isChatting: true, name: selectedTherapist.name, id: selectedTherapist.chatID});
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
                name: search.name,
                chatID: search.chatID
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