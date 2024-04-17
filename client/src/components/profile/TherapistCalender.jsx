import React, {useContext, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import { useParams, Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';

import '../../App.css';

import axios from 'axios';
import {Typography}  from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function TherapistCalender() {
    const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [Appointments, setAppointments] = useState(null);

  const [availableTimes, setAvailableTimes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  let [selectedDate, setSelectedDate] = useState(dayjs());

  const format = (date, index) => {
    let updatedtime;
    let time = index + 9;
    let afternoon = false;
    if (time > 12) {
      time -= 12;
      afternoon = true;
    }
    updatedtime = time.toString();
    return dayjs(date).format("MM/DD/YYYY") + " " + index;
  };

  useEffect(() => {
    console.log("CurrentuserCalander")
    console.log(currentUser)
    const fetchData = async () => {
      try {
        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/therapist/${currentUser.uid}`
        );
        const fetchedAppointments = responseMeeting.data;
        // Set appointments
        setAppointments(fetchedAppointments);
        console.log(fetchedAppointments);

        // set Calender
        console.log("bookedTimes");
        const bookedTimes = fetchedAppointments.reduce((acc, appointment) => {
          const date = dayjs(appointment.time).format("MM/DD/YYYY");
          const time = dayjs(appointment.time).format("h:mm A");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(time);
          return acc;
        }, {});
        setAvailableTimes(bookedTimes);
        console.log("avaialbletimes:");
        console.log(availableTimes);
        setLoading(false);
      } catch (e) {
        console.log("Therapist Calender error");
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
        <Grid item xs={12}>
          <Paper style={{ minHeight: "18vh", padding: "2vh" }}>
            <div className="right-section-header"> Upcoming Appointments </div>
            {Appointments === null ? (
              <Typography> No upcoming appointments.</Typography>
            ) : (
              <div>
                {Appointments.map((appointment, index) => (
                  <div key={index}>
                    <Typography variant="body1">
                      {appointment.time} with <Link to={`/patient/${appointment.patient}`}>
                {appointment.patientName}
              </Link>

                    </Typography>
                    {/* Add additional details about the appointment if needed */}
                  </div>
                ))}
              </div>
            )}
          </Paper>
        </Grid>
    </div>
  );
}

export default TherapistCalender;
