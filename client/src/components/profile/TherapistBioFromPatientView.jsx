import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

import { AuthContext } from "../../context/AuthContext";

import "../../App.css";

import axios from "axios";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function TherapistBioFromPatientView({ bio, specialty }) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [profileData, setProfileData] = useState(null);
  const [Appointments, setAppointments] = useState(null);
  const [newBio, setNewBio] = useState(bio);

  const [availableTimes, setAvailableTimes] = useState({});
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  if ((bio = "")) setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setProfileData(response.data);

        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/therapist/${id}`
        );
        const fetchedAppointments = responseMeeting.data;
        // filter appointments
        const filteredAppointments = fetchedAppointments.filter(appointment =>
          appointment.patient === currentUser.uid && appointment.therapist === id
        );
        setAppointments(filteredAppointments);
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
        console.log("yo");
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  //   insert Matching Button

  const handleTimeSelection = async (index) => {
    try {
      let updatedtime = format(selectedDate.$d, index);
      const response = await axios.post(`http://localhost:5173/meeting`, {
        currentUserID: currentUser.uid,
        therapistID: id,
        time: updatedtime,
      });
      console.log("Success Match Response:", response.data);

      const responseMeeting = await axios.get(
        `http://localhost:5173/meeting/therapist/${id}`
      );
      
      const fetchedAppointments = responseMeeting.data;
      console.log(fetchedAppointments)
      const filteredAppointments = fetchedAppointments.filter(appointment =>
        appointment.patient === currentUser.uid && appointment.therapist === id
      );
      setAppointments(filteredAppointments);

      const updatedAvailableTimes = { ...availableTimes };

      const selectedDateFormatted = updatedtime.$d;
      // Filter out the selectedTime from the availableTimes for the selectedDate
      console.log("updated");
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
      // setAvailableTimes(updatedAvailableTimes);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        // style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{ minHeight: "18vh", padding: "2vh" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="right-section-header"> Expertise </div>
              {editAbout ? (
                ""
              ) : (
                <IconButton onClick={() => setEditAbout(true)}></IconButton>
              )}
            </div>

            {editAbout ? (
              editTopics()
            ) : (
              <p align="left">
                {selectedTopics.join(", ") ||
                  "No topics found. Please edit, and add topics of expertise."}
              </p>
            )}
            <div className="right-section-header"> About Me </div>
            <TextField
              disabled={!editAbout}
              inputRef={(input) => input && input.focus()}
              fullWidth
              id="textbox-bio"
              label="Tell us about yourself!"
              value={currbio}
              onChange={(event) => setBio(event.target.value)}
              InputLabelProps={{
                shrink: currbio || editAbout ? true : false,
              }}
              multiline
              style={{ margin: "2vh 0 1vh 0" }}
              rows={3}
              inputProps={{
                maxLength: 285,
              }}
            />
            {editAbout && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton>
                  <CheckCircleIcon
                    onClick={() => {
                      putBio();
                      handleCheckboxChange();
                    }}
                  ></CheckCircleIcon>
                </IconButton>
                <IconButton>
                  <CancelRoundedIcon
                    onClick={() => {
                      setEditAbout(false);
                      setBio(newBio);
                    }}
                  ></CancelRoundedIcon>
                </IconButton>
              </div>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ minHeight: "40vh", padding: "2vh" }}>
            <div className="right-section-header">Upcoming Availability</div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    minDate={dayjs().startOf("month")}
                    maxDate={dayjs().add(1, "month").endOf("month")}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <strong>Available Times:</strong>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    ></div>
                    {[...Array(9).keys()].map((index) => {
                      const time = dayjs(selectedDate)
                        .startOf("day")
                        .add(9, "hours")
                        .add(index, "hours")
                        .format("h:mm A");
                      if (
                        !availableTimes[selectedDate.format("MM/DD/YYYY")] ||
                        !availableTimes[
                          selectedDate.format("MM/DD/YYYY")
                        ].includes(time)
                      ) {
                        return (
                          <button
                            className="timeCalender"
                            key={index}
                            onClick={() => handleTimeSelection(time)}
                          >
                            {time}
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ minHeight: "18vh", padding: "2vh" }}>
            <div className="right-section-header"> Upcoming Appointments </div>
            {Appointments === null ? (
              <Typography> No upcoming appointments.</Typography>
            ) : (
              <div>
                {Appointments.map((appointment, index) => (
                  <div key={index}>
                    <Typography variant="body1">{appointment.time}  with {appointment.patientName}: <a href={appointment.roomUrl} target="_blank">Meeting Link</a> </Typography>
                    {/* Add additional details about the appointment if needed */}
                  </div>
                ))}
              </div>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ minHeight: "18vh", padding: "2vh" }}>
            <div className="right-section-header"> Reviews </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBioFromPatientView;
