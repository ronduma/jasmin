import React, {useContext, useState} from 'react';
import dayjs from 'dayjs';

import {AuthContext} from '../../context/AuthContext';

import '../../App.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function TherapistBio() {
  const {currentUser} = useContext(AuthContext);
  let [selectedDate, setSelectedDate] = useState(dayjs())


  return (
    <div>
      <Grid 
        container 
        spacing={2}
        // style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{minHeight: '18vh', padding: '2vh'}}>
            <div className="right-section-header">
              About Me
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{minHeight: '40vh', padding: '2vh'}}>
            <div className="right-section-header">
              Upcoming Availability
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar defaultValue={dayjs()} onChange={(newValue) => setSelectedDate(newValue)} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-start' }}>
                {selectedDate.$d.toString()}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBio;
